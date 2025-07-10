<?php

namespace App\Controller;

use App\Service\FirebaseRestService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class RegisterController extends AbstractController
{
    private FirebaseRestService $firebaseService;

    public function __construct(FirebaseRestService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
public function register(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    if (!$data || !isset($data['email']) || !isset($data['password'])) {
        return $this->json(['error' => 'Email and password are required'], 400);
    }

    // Vérifier si l'email existe déjà
    $existingUser = $this->firebaseService->getUserByEmail($data['email']);
    if ($existingUser !== null) {
        return $this->json(['error' => 'Email already in use'], 409);
    }

    $userData = [
        'email' => $data['email'],
        'password' => password_hash($data['password'], PASSWORD_BCRYPT),
        'firstname' => $data['firstname'] ?? '',
        'lastname' => $data['lastname'] ?? '',
        'sexe' => $data['sexe'] ?? '',
        'createdAt' => new \DateTime(),
    ];

    try {
        $result = $this->firebaseService->createUserWithoutId($userData);

        return $this->json([
            'message' => 'User created successfully',
            'firestore_document' => $result['name'] ?? null
        ], 201);
    } catch (\Exception $e) {
        return $this->json(['error' => 'Failed to create user: ' . $e->getMessage()], 500);
    }
}


    
}

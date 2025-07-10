<?php
// src/Controller/LoginController.php

namespace App\Controller;

use App\Service\FirebaseRestService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    private FirebaseRestService $firebaseService;

    public function __construct(FirebaseRestService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return $this->json(['error' => 'Email and password are required.'], 400);
        }

        try {
            $user = $this->firebaseService->getUserByEmail($email);
            if (!$user) {
                return $this->json(['error' => 'User not found.'], 404);
            }

            $storedHash = $user['fields']['password']['stringValue'] ?? '';
            if (!password_verify($password, $storedHash)) {
                return $this->json(['error' => 'Invalid password.'], 401);
            }

            $userInfo = [
                'email' => $user['fields']['email']['stringValue'] ?? '',
                'firstname' => $user['fields']['firstname']['stringValue'] ?? '',
                'lastname' => $user['fields']['lastname']['stringValue'] ?? '',
                'sexe' => $user['fields']['sexe']['stringValue'] ?? '',
            ];

            return $this->json(['message' => 'Login successful', 'user' => $userInfo], 200);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Login failed: ' . $e->getMessage()], 500);
        }
    }
}

<?php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class FirebaseRestService
{
    private HttpClientInterface $client;
    private string $projectId;
    private string $database;
    private string $accessToken;

    public function __construct(HttpClientInterface $client, string $projectId, string $serviceAccountPath)
    {
        $this->client = $client;
        $this->projectId = $projectId;
        $this->database = '(default)';
        $this->accessToken = $this->authenticateWithFirebase($serviceAccountPath);
    }

    private function authenticateWithFirebase(string $serviceAccountPath): string
    {
        $json = json_decode(file_get_contents($serviceAccountPath), true);

        $now = time();
        $jwtHeader = ['alg' => 'RS256', 'typ' => 'JWT'];
        $jwtClaimSet = [
            'iss' => $json['client_email'],
            'scope' => 'https://www.googleapis.com/auth/datastore',
            'aud' => $json['token_uri'],
            'iat' => $now,
            'exp' => $now + 3600,
        ];

        $base64UrlHeader = rtrim(strtr(base64_encode(json_encode($jwtHeader)), '+/', '-_'), '=');
        $base64UrlPayload = rtrim(strtr(base64_encode(json_encode($jwtClaimSet)), '+/', '-_'), '=');

        $signatureInput = $base64UrlHeader . '.' . $base64UrlPayload;

        // Create signature
        $privateKey = openssl_pkey_get_private($json['private_key']);
        openssl_sign($signatureInput, $signature, $privateKey, 'sha256WithRSAEncryption');
        $base64UrlSignature = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');

        $jwt = $signatureInput . '.' . $base64UrlSignature;

        // Request access token
        $response = $this->client->request('POST', $json['token_uri'], [
            'headers' => ['Content-Type' => 'application/x-www-form-urlencoded'],
            'body' => [
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion' => $jwt,
            ],
        ]);

        $data = $response->toArray();
        return $data['access_token'];
    }

    public function createUserWithoutId(array $userData): array
    {
        $url = sprintf(
            'https://firestore.googleapis.com/v1/projects/%s/databases/%s/documents/users',
            $this->projectId,
            $this->database
        );

        $firestoreData = [
            'fields' => [
                'email' => ['stringValue' => $userData['email']],
                'password' => ['stringValue' => $userData['password']],
                'firstname' => ['stringValue' => $userData['firstname']],
                'lastname' => ['stringValue' => $userData['lastname']],
                'sexe' => ['stringValue' => $userData['sexe']],
                'createdAt' => ['timestampValue' => $userData['createdAt']->format(DATE_ATOM)],
            ],
        ];

        $response = $this->client->request('POST', $url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->accessToken,
            ],
            'json' => $firestoreData,
        ]);

        return $response->toArray();
    }

public function getUserByEmail(string $email): ?array
{
    $url = sprintf(
        'https://firestore.googleapis.com/v1/projects/%s/databases/%s/documents/users?pageSize=1000',
        $this->projectId,
        $this->database
    );

    $response = $this->client->request('GET', $url, [
        'headers' => [
            'Authorization' => 'Bearer ' . $this->accessToken,
        ],
    ]);

    $data = $response->toArray();

    foreach ($data['documents'] ?? [] as $doc) {
        if (($doc['fields']['email']['stringValue'] ?? '') === $email) {
            return $doc;
        }
    }

    return null;
}

}

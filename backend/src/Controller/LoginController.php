<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'login')]
    public function login(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setUsername($data['username']);
        $user->setPassword($data['password']);

        $userRepo = $entityManager->getRepository(User::class);
        $existingUser = $userRepo->findOneBy(['username' => $user->getUsername()]);

        if (!$existingUser) {
            return $this->json(['message' => 'User doesn\'t exist!'], 401);
        }

        if ($existingUser->getPassword() !== $user->getPassword()) {
            return $this->json(['message' => 'Invalid credentials!'], 401);
        }

        return $this->json([
            'id' => $existingUser->getId(),
            'email' => $existingUser->getEmail(),
            'username' => $existingUser->getUsername(),
            'password' => $existingUser->getPassword(),
            'isAdmin' => $existingUser->getIsAdmin(),
        ]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
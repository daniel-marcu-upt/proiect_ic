<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {

        // get the user data from the request body
        $data = json_decode($request->getContent(), true);

        // create a new user entity
        $user = new User();
        $user->setEmail($data['email']);
        $user->setUsername($data['username']);
        $user->setPassword($data['password']);
        $user->setIsAdmin($data['role']);

        $userRepo = $entityManager->getRepository(User::class);
        $existingUser = $userRepo->findOneBy(['username' => $user->getUsername()]);

        if ($existingUser) {
            return $this->json(['message' => 'User Already exists!'], 401);
        }


        // encode the password and set it on the user entity
//        $encodedPassword = $userPasswordHasher->encodePassword($user, $data['password']);
//        $user->setPassword($encodedPassword);

        // persist the user entity in the database
        $entityManager->persist($user);
        $entityManager->flush();

        // return a JSON response with the new user data
        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
            'password' => $user->getPassword(),
            'role' => $user->getIsAdmin(),
        ]);
    }
}

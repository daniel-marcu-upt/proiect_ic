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

class SecurityController extends AbstractController
{
//    #[Route(path: '/api/login', name: 'app_login')]
    #[Route('/login2', name: 'app_login')]
    public function login2(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        dd($request);

        $user = new User();
        $user->setEmail($data['email']);
        $user->setUsername($data['userName']);
        $user->setPassword($data['password']);
        $user->setName($data['name']);

        $errors = $this->get('validator')->validate($user);

        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], 400);
        }
//
//        $entityManager = $this->getDoctrine()->getManager();
//        $userRepo = $entityManager->getRepository(User::class);
//        $existingUser = $userRepo->findOneBy(['username' => $user->getUsername()]);

        dd($existingUser);

        if (!$existingUser) {
            return $this->json(['message' => 'Invalid credentials'], 401);
        }

//        $isValidPassword = $encoder->isPasswordValid($existingUser, $user->getPassword());

        if ($existingUser->getPassword() !== $user->getPassword()) {
            return $this->json(['message' => 'Invalid credentials'], 401);
        }

//        return $this->json([
//            'id' => $user->getId(),
//            'email' => $user->getEmail(),
//            'first_name' => $user->getUsername(),
//            'last_name' => $user->getPassword(),
//            'roles' => $user->getRoles(),
//            'name' => $user->getName(),
//        ]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}

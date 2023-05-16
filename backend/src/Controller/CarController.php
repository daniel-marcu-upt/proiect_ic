<?php

namespace App\Controller;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CarController
{

    #[Route('/post-car', name: 'creeate_car')]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {

        // get the user data from the request body
        $data = json_decode($request->getContent(), true);

        // create a new user entity
        $car = new Car();
        $car->setPlate($data['plate']);
        $car->setPlugType($data['plugType']);

        // persist the user entity in the database
        $entityManager->persist($car);
        $entityManager->flush();

        // return a JSON response with the new user data
        return $this->json([
            'id' => $car->getId(),
            'plate' => $car->getPlate(),
            'plugType' => $car->getPlugType(),
        ]);
    }
}
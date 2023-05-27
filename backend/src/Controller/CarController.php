<?php

namespace App\Controller;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CarController extends AbstractController
{

    #[Route('/api/get-cars/{id}', name: 'get_car')]
    public function getCars($id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $cars = $entityManager->getRepository(Car::class)->findByUserId($id);

        // return a JSON response with the new user data
        return $this->json(
            array_map(function ($car) {
                return [
                    'id' => $car->getId(),
                    'plate' => $car->getPlate(),
                    'plug' => $car->getPlugType(),
                    'booking' => '',
                ];
            }, $cars)
        );
    }
}
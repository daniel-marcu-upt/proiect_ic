<?php

namespace App\Controller;

use App\Entity\Car;
use App\Entity\Plug;
use App\Entity\Station;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PlugController extends AbstractController
{

    #[Route('/api/get-specific-plugs/{carId}/{stationId}', name: 'get_specific_plugs')]
    public function getSpecificPlugList($carId, $stationId, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $car = $entityManager->getRepository(Car::class)->find($carId);

        $plugs = $entityManager->getRepository(Plug::class)->findByCarPlugTypeAndStationId($car->getPlugType(), $stationId);


        // return a JSON response with the new user data
        return $this->json(
            array_map(function ($plug) {
                return [
                    'id' => $plug->getId(),
                    'name' => $plug->getName(),
                    'type' => $plug->getType(),
                    'status' => $plug->getStatus(),
                    'stationId' => $plug->getStationId(),
                ];
            }, $plugs)
        );
    }
}
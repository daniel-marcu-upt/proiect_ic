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

class StationController extends AbstractController
{

    #[Route('/api/get-specific-car-stations/{id}', name: 'get_specific_car_stations')]
    public function getSpecificCarStations($id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $car = $entityManager->getRepository(Car::class)->find($id);

        $stations = $entityManager->getRepository(Station::class)->findAll();
        $validStations = [];

        foreach ($stations as $station) {
            $plugs = $entityManager->getRepository(Plug::class)->findByCarPlugTypeAndStationId($car->getPlugType(), $station->getId());
            if (count($plugs) > 0) {
                $validStations[] = $station;
            }
        }

        // return a JSON response with the new user data
        return $this->json(
            array_map(function ($car) {
                return [
                    'id' => $car->getId(),
                    'latitude' => $car->getLatitude(),
                    'longitude' => $car->getLongitude(),
                    'name' => $car->getName(),
                    'location' => $car->getLocation(),
                ];
            }, $validStations)
        );
    }
}
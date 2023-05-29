<?php

namespace App\Controller;

use App\Entity\Booking;
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

        $validStations = $entityManager->getRepository(Station::class)->findByCarPlugType($car->getPlugType());
//        foreach ($stations as $station) {
//            $plugs = $entityManager->getRepository(Plug::class)->findByCarPlugTypeAndStationId($car->getPlugType(), $station->getId());
//            if (count($plugs) > 0) {
//                $validStations[] = $station;
//            }
//        }

        // return a JSON response with the new user data
        return $this->json(
            array_map(function ($car) {
                return [
                    'id' => $car->getId(),
                    'latitude' => $car->getLatitude(),
                    'longitude' => $car->getLongitude(),
                    'name' => $car->getName(),
                    'location' => $car->getLocation(),
                    'plugType' => $car->getPlugType(),
                ];
            }, $validStations)
        );
    }

    #[Route('/api/get-station-after-booking/{id}', name: 'get_station-after_booking')]
    public function getStationafterBooking($id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $booking = $entityManager->getRepository(Booking::class)->find($id);
        $station = $entityManager->getRepository(Station::class)->find($booking->getStationId());

        // return a JSON response with the new user data
        return $this->json(
            $station
        );
    }

    #[Route('/api/get-user-stations/{userId}', name: 'get_user_stations')]
    public function getUserStations($userId, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $stations = $entityManager->getRepository(Station::class)->findByUserId($userId);

        // return a JSON response with the new user data
        return $this->json(
            array_map(function ($station) {
                return [
                    'id' => $station->getId(),
                    'latitude' => $station->getLatitude(),
                    'longitude' => $station->getLongitude(),
                    'name' => $station->getName(),
                    'plug' => $station->getPlugType(),
                    'price' => $station->getPrice(),
                    'location' => $station->getLocation()
                ];
            }, $stations)
        );
    }
}
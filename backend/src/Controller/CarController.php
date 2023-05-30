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
                    'bookingId' => $car->getBookingId(),
                    'userId' => $car->getUserId(),
                    'name' => $car->getName(),
                    'imgUrl' => $car->getImgUrl(),
                ];
            }, $cars)
        );
    }
    #[Route('/api/post-car', name: 'create_car')]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // get the user data from the request body
        $data = json_decode($request->getContent(), true);

        // create a new user entity
        $car = new Car();
        $car->setPlate($data['plate']);
        $car->setPlugType($data['plugType']);
        $car->setUserId($data['user_id']);
        $car->setName($data['carName']);
        $car->setImgUrl($data['carImgUrl']);
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
    #[Route('/api/delete-car', name: 'delete_car')]
    public function delete(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // get the user data from the request body
        $data = json_decode($request->getContent(), true);

        $car = $entityManager->getRepository(Car::class)->findById($data['carId']);
        $entityManager->getRepository(Car::class)->remove($car[0]);

        $entityManager->flush();

        return $this->json([
            'len' => sizeof($car)
        ]);
    }
    #[Route('/api/edit-car', name: 'edit_car')]
    public function edit(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // get the user data from the request body
        $data = json_decode($request->getContent(), true);

        $car = $entityManager->getRepository(Car::class)->findById($data['carId'])[0];
        $car->setPlate($data['plate']);
        $car->setPlugType($data['plugType']);
        $car->setName($data['carName']);
        $car->setImgUrl($data['carImgUrl']);

        $entityManager->persist($car);
        $entityManager->flush();

        return $this->json([
            'id' => $car->getId(),
            'plate' => $car->getPlate(),
            'plugType' => $car->getPlugType(),
        ]);
    }

    #[Route('/api/add-booking-to-car/{id}', name: 'add_booking_to_car')]
    public function addBookingToCar($id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $car = $entityManager->getRepository(Car::class)->find($id);
        $car->setBookingId($data['bookingId']);

        $entityManager->persist($car);
        $entityManager->flush();

        // return a JSON response with the new user data
        return $this->json(
            $car
        );
    }

    #[Route('/api/delete_car_booking/{id}', name: 'delete_car_booking')]
    public function deleteCarBooking($id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $car = $entityManager->getRepository(Car::class)->find($id);
        $car->setBookingId(NULL);

        $entityManager->persist($car);
        $entityManager->flush();

        // return a JSON response with the new user data
        return $this->json(
            $car
        );
    }
}
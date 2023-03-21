<?php

namespace App\Entity;

use App\Repository\CarRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CarRepository::class)]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $plate;

    #[ORM\Column(type: 'string', length: 255)]
    private $plugType;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'cars')]
    private $user_id;

    #[ORM\OneToOne(inversedBy: 'car', targetEntity: Booking::class, cascade: ['persist', 'remove'])]
    private $booking_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlate(): ?string
    {
        return $this->plate;
    }

    public function setPlate(string $plate): self
    {
        $this->plate = $plate;

        return $this;
    }

    public function getPlugType(): ?string
    {
        return $this->plugType;
    }

    public function setPlugType(string $plugType): self
    {
        $this->plugType = $plugType;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUserId(): Collection
    {
        return $this->user_id;
    }

    public function addUserId(User $userId): self
    {
        if (!$this->user_id->contains($userId)) {
            $this->user_id[] = $userId;
        }

        return $this;
    }

    public function removeUserId(User $userId): self
    {
        $this->user_id->removeElement($userId);

        return $this;
    }

    public function getBookingId(): ?Booking
    {
        return $this->booking_id;
    }

    public function setBookingId(?Booking $booking_id): self
    {
        $this->booking_id = $booking_id;

        return $this;
    }
}

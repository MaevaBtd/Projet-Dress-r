<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OutfitRepository")
 */
class Outfit
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="outfits")
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Cloth", mappedBy="outfits")
     */
    private $cloths;

    public function __construct()
    {
        $this->cloths = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Cloth[]
     */
    public function getCloths(): Collection
    {
        return $this->cloths;
    }

    public function addCloth(Cloth $cloth): self
    {
        // if (!$this->cloths->contains($cloth)) {
            $this->cloths[] = $cloth;
            $cloth->addOutfit($this);
        // }

        return $this;
    }

    public function removeCloth(Cloth $cloth): self
    {
        if ($this->cloths->contains($cloth)) {
            $this->cloths->removeElement($cloth);
            $cloth->removeOutfit($this);
        }

        return $this;
    }
}

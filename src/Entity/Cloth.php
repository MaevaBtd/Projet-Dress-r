<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClothRepository")
 */
class Cloth
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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @ORM\Column(type="boolean")
     */
    private $withoutPants;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="cloths")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Type", inversedBy="cloths")
     */
    private $type;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Style", inversedBy="cloths")
     */
    private $styles;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Outfit", inversedBy="cloths")
     */
    private $outfits;

    public function __construct()
    {
        $this->styles = new ArrayCollection();
        $this->outfits = new ArrayCollection();
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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getWithoutPants(): ?bool
    {
        return $this->withoutPants;
    }

    public function setWithoutPants(bool $withoutPants): self
    {
        $this->withoutPants = $withoutPants;

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

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function setType(?Type $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection|Style[]
     */
    public function getStyles(): Collection
    {
        return $this->styles;
    }

    public function addStyle(Style $style): self
    {
        // if (!$this->styles->contains($style)) {
            $this->styles[] = $style;
            
        // }

        return $this;
    }

    public function removeStyle(Style $style): self
    {
        if ($this->styles->contains($style)) {
            $this->styles->removeElement($style);
        }

        return $this;
    }

    /**
     * @return Collection|Outfit[]
     */
    public function getOutfits(): Collection
    {
        return $this->outfits;
    }

    public function addOutfit(Outfit $outfit): self
    {
        // if (!$this->outfits->contains($outfit)) {
            $this->outfits[] = $outfit;
        // }

        return $this;
    }

    public function removeOutfit(Outfit $outfit): self
    {
        if ($this->outfits->contains($outfit)) {
            $this->outfits->removeElement($outfit);
        }

        return $this;
    }

}

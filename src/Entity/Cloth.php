<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\ClothRepository")
 */
class Cloth
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * 
     * @Groups({"cloth_read", "user_cloths", "user_outfits", "outfit_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     * 
     * @Groups({"cloth_read", "user_cloths", "user_outfits", "outfit_read"})
     */
    private $name;

    /**
     * @Assert\File(
     * maxSize = "1024k", 
     * mimeTypes={ "image/gif", "image/jpeg", "image/png" },
     * mimeTypesMessage = "Please valid image format : gif, png, jpeg"
     * )
     * 
     * @ORM\Column(type="string", length=255, nullable=true)
     * 
     * @Groups({"cloth_read", "user_cloths", "outfit_read"})
     */
    private $image;

    /**
     * @ORM\Column(type="boolean")
     * 
     * @Groups({"cloth_read", "outfit_read"})
     */
    private $withoutPants;

    /**
     * @ORM\Column(type="datetime")
     * 
     * @Groups({"cloth_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * 
     * @Groups({"cloth_read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="cloths")
     * 
     * @Groups({"cloth_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Type", inversedBy="cloths")
     * 
     * @Groups({"user_cloths", "outfit_read", "cloth_read"})
     */
    private $type;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Style", inversedBy="cloths", cascade={"persist"})
     * 
     * @Groups({"user_cloths", "outfit_read", "cloth_read"})
     */
    private $styles;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Outfit", inversedBy="cloths", cascade={"persist"})
     * 
     * @Groups({"cloth_read"})
     */
    private $outfits;

    public function __construct()
    {
        $this->styles = new ArrayCollection();
        $this->outfits = new ArrayCollection();
        $this->withoutPants = false;
        $this->createdAt = new \Datetime();
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

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($image): self
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

    public function __toString()
    {
        return $this->name;
    }
}

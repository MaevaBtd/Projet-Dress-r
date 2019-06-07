<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"user_cloths", "user_outfits", "cloth_read", "user_show"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     *
     * @Groups({"cloth_read", "user_cloths", "user_outfits", "user_show"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_show"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $password;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"user_show"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Role", inversedBy="users")
     * @Groups({"user_show"})
     */
    private $role;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Cloth", mappedBy="user", cascade={"persist", "remove"})
     * @Groups({"user_cloths"})
     */
    private $cloths;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Outfit", mappedBy="user", cascade={"persist", "remove"})
     * @Groups({"user_outfits"})
     */
    private $outfits;

    public function __construct()
    {
        $this->cloths = new ArrayCollection();
        $this->outfits = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

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

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        $this->role = $role;

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
        if (!$this->cloths->contains($cloth)) {
            $this->cloths[] = $cloth;
            $cloth->setUser($this);
        }

        return $this;
    }

    public function removeCloth(Cloth $cloth): self
    {
        if ($this->cloths->contains($cloth)) {
            $this->cloths->removeElement($cloth);
            // set the owning side to null (unless already changed)
            if ($cloth->getUser() === $this) {
                $cloth->setUser(null);
            }
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
        if (!$this->outfits->contains($outfit)) {
            $this->outfits[] = $outfit;
            $outfit->setUser($this);
        }

        return $this;
    }

    public function removeOutfit(Outfit $outfit): self
    {
        if ($this->outfits->contains($outfit)) {
            $this->outfits->removeElement($outfit);
            // set the owning side to null (unless already changed)
            if ($outfit->getUser() === $this) {
                $outfit->setUser(null);
            }
        }

        return $this;
    }

    public function getRoles(){}
    
    public function getSalt(){}

    public function eraseCredentials(){}
    
}

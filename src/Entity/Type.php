<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TypeRepository")
 */
class Type
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_cloths"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     * @Groups({"user_cloths"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Cloth", mappedBy="type")
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
            $cloth->setType($this);
        }

        return $this;
    }

    public function removeCloth(Cloth $cloth): self
    {
        if ($this->cloths->contains($cloth)) {
            $this->cloths->removeElement($cloth);
            // set the owning side to null (unless already changed)
            if ($cloth->getType() === $this) {
                $cloth->setType(null);
            }
        }

        return $this;
    }
}

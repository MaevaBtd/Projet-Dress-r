<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StyleRepository")
 */
class Style
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @Groups({"user_cloths", "styles_index", "outfit_read", "cloth_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     *
     * @Groups({"user_cloths", "styles_index","outfit_read", "cloth_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Cloth", mappedBy="styles")
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
            $cloth->addStyle($this);
        }

        return $this;
    }

    public function removeCloth(Cloth $cloth): self
    {
        if ($this->cloths->contains($cloth)) {
            $this->cloths->removeElement($cloth);
            $cloth->removeStyle($this);
        }

        return $this;
    }
}

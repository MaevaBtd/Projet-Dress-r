<?php

namespace App\Repository;

use App\Entity\Outfit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Outfit|null find($id, $lockMode = null, $lockVersion = null)
 * @method Outfit|null findOneBy(array $criteria, array $orderBy = null)
 * @method Outfit[]    findAll()
 * @method Outfit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OutfitRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Outfit::class);
    }


    // retourne un vêtement filtré par l'id
    public function findById($id)
    {

        return $this->createQueryBuilder('o')
        ->andWhere('o.id = :val')
        ->setParameter('val', $id)
        ->getQuery()
        ->getResult();
    }

  
    // /**
    //  * @return Outfit[] Returns an array of Outfit objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Outfit
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

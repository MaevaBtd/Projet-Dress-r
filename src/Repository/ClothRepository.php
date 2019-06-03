<?php

namespace App\Repository;

use App\Entity\Cloth;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Cloth|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cloth|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cloth[]    findAll()
 * @method Cloth[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClothRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Cloth::class);
    }


    // retourne un vêtement filtré par l'id
    public function findById($id) {

        return $this->createQueryBuilder('c')
            ->andWhere('c.id = :val')
            ->setParameter('val', $id)
            ->getQuery()
            ->getResult()
            ;
    }
    // /**
    //  * @return Cloth[] Returns an array of Cloth objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Cloth
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

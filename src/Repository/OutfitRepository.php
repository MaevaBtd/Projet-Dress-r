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

    public function findUserOutfitsByUserId($userId){
         
        return $this->createQueryBuilder('o')
        ->select('o.id','o.name')
        ->join('o.user', 'u')
        ->andWhere('u.id = :userId')
        ->setParameter('userId',$userId)
        ->addSelect('u.username AS user_name')

        ->getQuery()->getResult();
    }

    public function findOneByUserId ($outfitName, $userId) {

        return $this->createQueryBuilder('o')
        ->select('o.name')
        ->join('o.user', 'u')
        ->addSelect('u.id')
        ->andWhere('o.name = :outfitName')
        ->setParameter('outfitName', $outfitName)
        ->andWhere('u.id = :userId')
        ->setParameter('userId', $userId)

        ->getQuery()->getResult();
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

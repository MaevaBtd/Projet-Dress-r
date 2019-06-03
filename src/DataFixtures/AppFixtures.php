<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\Type;

use RauweBieten\PhpFakerClothing\Clothing;

use Faker\Factory;
use App\Entity\Role;
use App\Entity\User;
use App\Entity\Cloth;
use App\Entity\Style;
use Faker\ORM\Doctrine\Populator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use App\DataFixtures\Faker\MyProvider;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $generator = Factory::create('fr_FR');
        $populator = new Populator($generator, $manager);

        $generator->addProvider(new Clothing($generator));
        $generator->addProvider(new MyProvider($generator));



        $populator->addEntity(Role::class, 3, array(
            'code' => function () use ($generator) {
                return $generator->firstName();
            },
            'name' => function () use ($generator) {
                return $generator->firstName();
            },
        ));

        $populator->addEntity(User::class, 4, array(
            'username' => function () use ($generator) {
                return $generator->username();
            },
            'email' => function () use ($generator) {
                return $generator->email();
            },
            'password' => function () use ($generator) {
                return $generator->pass();
            }
        ));

        $populator->addEntity(Style::class, 10, array(
            'name' => function () use ($generator) {
                return $generator->styles();
            }
        ));

        $populator->addEntity(Cloth::class, 20, array(
            'name' => function () use ($generator) {
                return $generator->clothName();
            },
            'image' => function () use ($generator) {
                return $generator->imageCloths();
            }
        ));

        $populator->addEntity(Type::class, 5, array(
            'name' => function () use ($generator) {
                return $generator->types();
            }
        ));

        $insertedEntities = $populator->execute();


        $manager->flush();
    }
}

<?php

namespace App\Form;

use App\Entity\Outfit;
use App\Form\ClothType;
use App\Form\ApplicationType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;


class OutfitType extends ApplicationType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name',TextType::class, $this->getConfiguration("Votre tenue", "Nommez votre tenue "),
            ['constraints' => 
                    new NotBlank()

            ])
            // ->add('cloths',EntityType::class,[
            //     'class'=> ClothType::class,
            //     'choice_label' => 'name',
            //     'multiple'=> true
            // ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Outfit::class,
            'attr' => ['novalidate' => 'novalidate'],
            'compound' => true
        ]);
    }
}



<?php

namespace App\Form;

use App\Entity\Type;
use App\Entity\Cloth;
use App\Entity\Style;
use App\Form\ApplicationType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;


class ClothType extends ApplicationType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name',TextType::class,$this->getConfiguration("vêtement", "Nommez votre vêtement"),[
                 'constraints' => [
                    new NotBlank()

                ]
            ])
                    
            ->add('image', UrlType::class,$this->getConfiguration("photo de votre vêtement","Entrez l'URL de votre vêtement"),[
                'constraints'=> [
                    new NotBlank()
                ]
            ])
            ->add( 'without_pants',CheckboxType::class,[
            'label'    => 's\'agit il d\'un vêtement en un seul tenant ?',
            'required' => false
            ])

            ->add('type',EntityType::class,[
                'class' => Type::class,
                'choice_label' => 'name',
                'expanded'=>true,
                'multiple' =>false
            ])
            ->add('styles',EntityType::class,[
                'class'=> Style::class,
                'choice_label' => 'name',
                'expanded' => true,
                'multiple' => true
            ]);
    
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Cloth::class,
            'attr' => ['novalidate' => 'novalidate'],
            'compound'=> true
        ]);
    }
}

<?php

namespace App\Form;

use App\Entity\Cloth;
use App\Entity\Outfit;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class OutfitType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name',TextType::class,[
                'label' => 'Nom de la tenue',
                'attr' => [
                    'placeholder' => "Entrez le nom de votre tenue !"
                ]
            ],[
                'constraints' => [
                    new NotBlank([
                        'message'=>'Le nom de la tenue ne peut pas être vide'
                    ]),
                    new Length([
                        'min' => 3,
                        'max' => 64,
                        'minMessage' => "Votre nom de tenue est trop court (min attendu :{{ limit }})",
                        'maxMessage' => "Voter nom de tenue est trop long  (max attendu : {{ limit }})"
                    ]),

                ],
                    'required'=>true
            ])
            ->add('cloths',EntityType::class,[
                    'class'=> Cloth::class,
                    'choice_label' => 'name',
                    'expanded' => true,
                    'multiple' => true,
                    'required' => true
            ]);
       
        
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Outfit::class,
            'attr' => ['novalidate' => 'novalidate'],
            
        ]);
    }
}



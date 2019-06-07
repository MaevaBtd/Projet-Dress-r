<?php

namespace App\Form;

use App\Entity\Cloth;
use App\Entity\Style;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Form\AbstractType;

class ClothType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name',TextType::class,[
                'label' => 'Nom du vêtement',
                'attr'=>[
                    'placeholder'=> "Entrez le nom de votre vêtement !"
                 ] 
                ],[
                 'constraints' => [
                    new NotBlank([
                        'message'=> 'le nom de votre vêtement ne peut pas être vide'
                    ]),
                    new Length([
                        'min'=> 3,
                        'max'=> 64,
                        'minMessage'=> 'Le nom de votre vêtement est trop court (min attendu :{{ limit}})',
                        'maxMessage'=>'Le nom de votre vêtement est trop long (max attendu : {{ limit }})'
                        
                    ]),
                    'required' => true
                    
                ]
            ])
                    
            ->add('image', UrlType::class,[
            'label' => 'Image du vêtement',
            'attr' => [
                'placeholder' => "Entrez l'URL de votre vêtement' !"
             ]
            ],[
                'constraints'=> [
                    new NotBlank([
                    'message' => 'l\'URL de votre image ne peut pas être vide'
                    ]),
                    new Length([
                    'min' => 3,
                    'max' => 255,
                    'minMessage' => 'L\'URL de votre image est trop court (min attendu :{{ limit}})',
                    'maxMessage' => 'L\'URL de votre image est trop long (max attendu : {{ limit }})'

                    ]),
                    'required'=> true
                ]
            ])
            ->add('withoutPants',CheckboxType::class,[
            'label'    => 's\'agit il d\'un vêtement en un seul tenant ?',
            'required' => true
            ])

            ->add('styles',EntityType::class,[
                'class'=> Style::class,
                'choice_label' => 'name',
                'expanded' => true,
                'multiple' => true,
                'required'=> true
            ]);
    
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Cloth::class,
            'attr' => ['novalidate' => 'novalidate'],
            
        ]);
    }
}

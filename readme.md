# Definition des rôles

- Product Owner : Maxime
- Project Manager : Anne
- Lead Back : Kevin
- Lead Front : Maëva
- Git Master : Maxime

# Cahier des charges

## Objectifs du projet

- entrer des éléments en base de donnée
- faire des combinaisons de ces éléments
- sauvegarder les combinaisons
- générer des combinaisons aléatoirement

## Présentation du projet

Ce serait donc une application web sur laquelle on pourrait enregistrer tous les vêtements (et chaussures) que l'on possède et choisir avec quels autres ils s'accordent.
Il y aurait donc une bibliothèque de tous les hauts, bas, chaussures (v2 : accessoires) que l'utilisateur pourrait remplir avec notamment des photos.

Pour chaque vêtement ajouté, il serait possible de l'associer à d'autres ou même de créer des tenues complètes.

Enfin l'appli serait capable de générer des ensembles de manière "aléatoire" en fonctions des association que l'on autorise.

## Présentation des rôles

## Arborésence de l'appli

## Techno envisagées

- HTML 5
- CSS3 ( antDesign )
- JS ( React )
- PHP7 ( Symfony )
- MySQL

## Résultat attendu

## Public visé

Public mixte qui possede une garde robe fournie et qui souhaite gargner du temps dans certaines circonstances ou rationaliser le contenu de sa garde robe (minimalistes).
Peut viser des gens pour qui la mode importe peu et qui souhaitent gagner du temps et diversifier leur manière d'exploiter leur garde-robe.

## Spécifications techniques et fonctionnelles

Trello: https://trello.com/b/0MMXppp8/apoth%C3%A9ose

User Stories

|En tant que...|J'ai besoin de...|afin de...|Commentaire...|
|--|--|--|--|
|visiteur|une page d'accueil|découvrir le principe de l'application et accéder au formulaire d'incription|...|
|visiteur|un formulaire d'inscription|créer un compte sur l'application|...|

|En tant que...|J'ai besoin de...|afin de...|Commentaire...|
|--|--|--|--|
|utilisateur|un formulaire de connexion|se connecter à mon compte|...|
|utilisateur|une page profil|gérer mes données personnelles|...|
|utilisateur|une page garde-robe|qui résume le contenu de ma garde robe et mes tenues sauvegardées|tri par style, type de vêtements...|
|utilisateur|un formulaire|ajouter de nouveaux vêtements à mon compte( et y attribuer un type: haut,bas,chaussure )|...|
|utilisateur|page garde-robe ou page ajout du vêtement|assigner un vêtement à un tag (sport,soirée,travail..)|...|
|utilisateur|page garde-robe ou page ajout du vêtement|ajouter une photo pour un vêtement|...|
|utilisateur|page garde-robe|Modifier/Supprimer tout les vêtements ajoutés par l'utilisateur|...|
|utilisateur|page garde-robe ou page ajout du vêtement|Gerer les associations entre les différents vêtements|...|
|utilisateur|un |composer une tenue personnelle|...|
|utilisateur|page application "******" |lancer l'application "*******" qui permet de trouver en un clic une tenue appropriée|...|

|En tant que...|J'ai besoin de...|afin de...|Commentaire...|
|--|--|--|--|
|administrateur| |gerer les utilisateurs|...|
|administrateur||ajouter/modifier/supprimer des tags|...|

User Stories v2 - ajout du blog
|En tant que...|J'ai besoin de...|afin de...|Commentaire...|
|--|--|--|--|
|visiteur|un blog|consulter l'actualité du site|...|
|utilisateur|un blog|consulter l'actualité du site et mettre des commentaires|...|
|utilisateur|un profil|partager aux autres mes tenues sauvegardées|...|
|utilisateur||ajouter un tag personnalisé(seulement accessible pour soit)|...|

|administrateur| de controller le contenu uploadé par les utilisateurs| afin d'éviter tout contenu indésirable|...|

## Minimum Viable Product

### Visiteur

- page home de présentation du site
- accès à un formulaire de création de compte

### Utilisateur

- formulaire de connexion à son compte
- ajout et modifications de vetements
- systeme de filtre sur les vêtements de l'utilisateur en applicant des tags
- créer une tenue personnalisée
- lancer l'app random ( et la sauvegarder )

### Administrateur

- ajouter des tags
- gerer les utilisateurs

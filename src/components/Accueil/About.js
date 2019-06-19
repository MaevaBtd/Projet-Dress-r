// == Import: Yarn
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSocks, faTshirt, faMitten } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
// == Import: local
import './About.scss';

// == Code
const About = () => (
  <div id="about">
    <h2 id="about-link">Gestion de garde-robe</h2>
    <Carousel autoplay>
      <div>
        <h3><img src="src/data/assets/outfit.jpg" alt="" /></h3>
      </div>
      <div>
        <h3><img src="src/data/assets/main.jpg" alt="" /></h3>
      </div>
      <div>
        <h3><img src="src/data/assets/cloth.jpg" alt="" /></h3>
      </div>
      <div>
        <h3><img src="src/data/assets/random.jpg" alt="" /></h3>
      </div>
    </Carousel>
    <FontAwesomeIcon size="2x" className="icon" icon={faTshirt} />
    <h2>Créez votre garde robe personnalisée en ligne !</h2>
    <p>
    Ajoutez votre vêtement en quelques clics, un nom, un style,
    une photo et votre vêtement est prêt ! Envie de partager votre nouvel achat avec vos ami(e)s ?
    Besoin de conseils en boutique pour l'achat d'un nouveau vêtement qui irait parfaitement avec votre haut préféré ?
    Tous vos vêtements sont disponibles dans votre garde robe .
    </p>
    <FontAwesomeIcon size="2x" className="icon" icon={faSocks} />
    <h2>Créez et sauvegardez vos tenues !</h2>
    <p>
    Fier(e)  de cette sublime tenue du jour de l'an, mais vous avez peur de l'oublier ? Enregistrez la !
    Plus besoin de perdre du temps dans votre dressing, allez à l'essentiel,
    choisissez une de vos tenues et habillez-vous ! 
    </p>
    <FontAwesomeIcon size="2x" className="icon" icon={faMitten} />
    <h2>Dress Me please !</h2>
    <p>
    Plus de temps pour choisir sa tenue ?  Envie d'un peu de piquant ?
    Ou tout simplement pas envie de se prendre la tête ? Laissez-nous faire !
    La fonctionnalité "Dress Me" permet de vous générer une tenue aléatoire avec
    vos propres vêtements. Et si le hasard fait bien les choses,
    vous pouvez directement l'enregistrer !
    </p>
  </div>
);

// == Export
export default About;

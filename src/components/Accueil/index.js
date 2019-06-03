// == Import: Yarn
import React from 'react';

// == Import: local
import './Accueil.scss';
import Welcome from './Welcome';
import About from './About';
import Footer from '../Footer';

// == Code
const Accueil = () => (
  <div id="accueil">
    <Welcome />
    <About />
    <Footer />
  </div>
);

// == Export
export default Accueil;

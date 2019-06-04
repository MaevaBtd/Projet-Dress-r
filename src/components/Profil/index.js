// == Import: Yarn
import React from 'react';
import {
  Button,
  Icon,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Profil.scss';

// == Code
const Profil = () => (
  <div id="profil">
    <h1>Bonjour Pseudo</h1>
    <div className="stats">
      <p>J'ai x tenues enregistrées</p>
      <p>J'ai x vêtements enregistrés</p>
      <p>J'ai utilisé l'outil Tenues Aléatoires x fois</p>
    </div>
    <h2>Mon adresse mail: <span>toto@email.com</span></h2>
    <h2>Date d'inscription: <span>28/05/19</span></h2>
    <Button>
      <Icon type="unlock" /> Modifier mon Mot de passe
    </Button>
    <Button>
      <Icon type="user" /> Modifier mes informations personnelles
    </Button>
  </div>
);

// == Export
export default Profil;

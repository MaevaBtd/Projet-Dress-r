// == Import: Yarn
import React from 'react';
import { NavLink } from 'react-router-dom';

// == Import: local
import './Welcome.scss';
import { Button } from 'antd';
import 'antd/dist/antd.css';

// == Code
const Welcome = () => (
  <div id="welcome">
    <img id="logo" src="src/data/assets/logo.png" alt="" />
    <h1>Dress'R</h1>
    <h2>L'appli pour gérer votre garde-robe</h2>
    <div id="button">
      <NavLink to="/signin"><Button className="log">Inscription</Button></NavLink>
      <NavLink to="/signup"><Button className="log">Connexion</Button></NavLink>
    </div>
    <Button className="about">En savoir plus</Button>
  </div>
);

// == Export
export default Welcome;

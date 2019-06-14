// == Import: Yarn
import React from 'react';
import { NavLink } from 'react-router-dom';

// == Import: local
import './Welcome.scss';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import logo from 'src/data/assets/logo.png';
import main from 'src/data/assets/main.jpg';

// == Code
const Welcome = () => (
  <div id="welcome">
    <img id="logo" src={logo} alt="" />
    {/* <img id="main-image" src={main} alt="" /> */}
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

// == Import: Yarn
import React from 'react';
import { NavLink } from 'react-router-dom';

// == Import: local
import './Main.scss';

// == Code
const Main = () => (
  <div id="main">
    <div id="main-container">
      <NavLink to="/wardrobe"><h1 className="vertical">Ma garde-robe</h1></NavLink>
      <NavLink to="/random"><h1 className="vertical">Tenue Aléatoire</h1></NavLink>
      <NavLink to="/add-new-cloth"><h1 className="horizontal">Ajouter un vêtement</h1></NavLink>
    </div>
  </div>
);

// == Export
export default Main;

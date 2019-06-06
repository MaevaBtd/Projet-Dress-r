// == Import : npm
import React from 'react';
import { NavLink } from 'react-router-dom';

// == Import : local
import './header.scss';

// == Composant
const Header = () => (
  <nav className=" navbar navbar-expand-lg navbar-dark fixed-top">
    <NavLink to="/"><h1 className="nav-title">Dress'R</h1></NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-light navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ml-auto">
        <NavLink className="nav-item nav-link" to="/signin">Inscription</NavLink>
        <NavLink className="nav-item nav-link" to="/signup">Connexion</NavLink>
        <NavLink className="nav-item nav-link" to="/wardrobe">Ma Garde-robe</NavLink>
        <NavLink className="nav-item nav-link" to="/profil">Profil</NavLink>
        <NavLink className="nav-item nav-link" to="/user-page">Accueil User</NavLink>
      </div>
    </div>
  </nav>
);

// == Export
export default Header;

// == Import : npm
import React from 'react';

// == Import : local
import './header.scss';

// == Composant
const Header = () => (
  <nav className=" navbar navbar-expand-lg navbar-dark fixed-top">
    <a href=""><h1 className="nav-title" href="#">Dress'R</h1></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-light navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="#">Inscription <span className="sr-only">(current)</span></a>
        <a className="nav-item nav-link" href="#">Connexion</a>
      </div>
    </div>
  </nav>
);

// == Export
export default Header;

// == Import : npm
import React from 'react';

// == Import : local
import './index.scss';

// == Composant
const Header = () => (
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Logo</a>
      <ul id="nav">
        <li><a href="#">Connexion</a></li>
        <li><a href="#">Inscription</a></li>
      </ul>
    </div>
  </nav>
);

// == Export
export default Header;

// == Import : npm
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import './header.scss';

// == Composant
class Header extends React.Component {
  logout(evt) {
    evt.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;


    const userLinks = (
      <div className="navbar-nav ml-auto">
        <NavLink className="nav-item nav-link" to="/add-new-cloth">Ajouter un nouveau vêtement</NavLink>
        <NavLink className="nav-item nav-link" to="/wardrobe">Garde-robe</NavLink>
        <NavLink className="nav-item nav-link" to="/profil">Profil</NavLink>
        <NavLink className="nav-item nav-link" to="/random">Random</NavLink>
        <NavLink className="nav-item nav-link" to="/cloth-list">Liste des vêtemnts</NavLink>
        <NavLink className="nav-item nav-link" to="/random" onClick={this.logout.bind(this)}>Déconnexion</NavLink>
      </div>
    );

    const guestLinks = (
      <div className="navbar-nav ml-auto">
        <NavLink className="nav-item nav-link" to="/signin">Inscription</NavLink>
        <NavLink className="nav-item nav-link" to="/signup">Connexion</NavLink>
      </div>
    );

    return (
      <nav className=" navbar navbar-expand-lg navbar-dark fixed-top">
        <NavLink to="/"><h1 className="nav-title">Dress'R</h1></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-light navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};


// == Export
export default Header;

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
        <NavLink className="nav-item nav-link" to="/add-new-cloth"> <p className="header-link">Ajouter un nouveau vêtement</p></NavLink>
        <NavLink className="nav-item nav-link" to="/wardrobe"> <p className="header-link">Garde-robe</p></NavLink>
        <NavLink className="nav-item nav-link" to="/profil"> <p className="header-link">Profil</p></NavLink>
        <NavLink className="nav-item nav-link" to="/random"> <p className="header-link">Random</p></NavLink>
        <NavLink className="nav-item nav-link" to="/cloth-list"> <p className="header-link">Liste des vêtemnts</p> </NavLink>
        <NavLink className="nav-item nav-link" to="/random" onClick={this.logout.bind(this)}> <p className="header-link">Déconnexion</p> </NavLink>
      </div>
    );

    const guestLinks = (
      <div className="navbar-nav ml-auto">
        <NavLink className="nav-item nav-link" to="/signin"><p className="header-link">Inscription</p></NavLink>
        <NavLink className="nav-item nav-link" to="/signup"> <p className="header-link">Connexion</p></NavLink>
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

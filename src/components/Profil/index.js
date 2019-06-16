// == Import: Yarn
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import {
  Button,
  Icon,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './Profil.scss';

// == Code
class Profil extends React.Component {
  componentDidMount() {
    const { fetchUserInfo } = this.props;
    fetchUserInfo();
  }

  render() {
    const { user, email, creationDate, isAuthenticated } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="profil">
        <h1>Bonjour {user}</h1>
        <div className="stats">
          <p>J'ai <span className="user-counter">x</span> tenues enregistrées</p>
          <p>J'ai <span className="user-counter">x</span> vêtements enregistrés</p>
          <p>J'ai utilisé l'outil Tenues Aléatoires <span className="user-counter">x</span> fois</p>
        </div>
        <h2>Mon adresse mail: <span>{email}</span></h2>
        <h2 id="date">Date d'inscription: <span>{creationDate}</span></h2>
        <NavLink to="/change-mdp">
          <Button className="button">
            <Icon type="unlock" /> Modifier mon Mot de passe
          </Button>
        </NavLink>

        <Button className="button">
          <Icon type="user" /> Modifier mes informations personnelles
        </Button>
      </div>
    );
  }
}

Profil.propTypes = {
  fetchUserInfo: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

// == Export
export default Profil;

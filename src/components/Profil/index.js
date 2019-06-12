// == Import: Yarn
import React from 'react';
import { NavLink } from 'react-router-dom';
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
    return (
      <div id="profil">
        <h1>Bonjour Pseudo</h1>
        <div className="stats">
          <p>J'ai x tenues enregistrées</p>
          <p>J'ai x vêtements enregistrés</p>
          <p>J'ai utilisé l'outil Tenues Aléatoires x fois</p>
        </div>
        <h2>Mon adresse mail: <span>toto@email.com</span></h2>
        <h2 id="date">Date d'inscription: <span>28/05/19</span></h2>
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
};

// == Export
export default Profil;

// == Import: Yarn
import React from 'react';
import { Redirect } from 'react-router-dom';

// == Import: local
import './Accueil.scss';
import Welcome from './Welcome';
import About from './About';
// import Footer from '../Footer';
// import Header from '../Header ';

// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Accueil extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) return <Redirect to="/user-page" />;
    return (
      <div id="accueil">
        <Welcome />
        <About />
      </div>
    )
  }
}

// == Export
export default Accueil;

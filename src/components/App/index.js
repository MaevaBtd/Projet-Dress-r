// == Import : npm
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import './app.scss';

// peaufiner toute les size dès que toute l'inté est faite
import Wardrobe from 'src/containers/Wardrobe';
import Accueil from 'src/components/Accueil';
import Footer from 'src/components/Footer';
import Header from '../Header ';
import FormAddCloth from '../AddCloth/FormAddCloth';
import Main from '../Main';
import Changemdp from '../Profil/ChangeMdp';
import Profil from '../Profil';
import Signin from '../Sign/Signin';
import Signup from '../Sign/Signup';
import Outfit from '../Outfit';


import AddCloth from '../AddCloth';
// gerer le dé (png pour le moment)
import Random from '../Random';
//  import Sign from '../Sign';


// == Composant
class App extends Component {
  componentDidMount() {
    const { fetchClothContent } = this.props;
    fetchClothContent();
  }


  render() {
    return (
      <div id="app">

        <nav>
          <Header />
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Accueil} />
            <Route
              path="/signin"
              component={Signin}
            />
            <Route
              path="/signup"
              component={Signup}
            />
            <Route
              path="/wardrobe"
              component={Wardrobe}
            />
            <Route
              path="/profil"
              component={Profil}
            />
            <Route
              path="/random"
              component={Random}
            />
            <Route
              path="/add-new-cloth"
              component={AddCloth}
            />
            <Route
              path="/form-new-cloth"
              component={FormAddCloth}
            />
            <Route
              path="/outfit-id"
              component={Outfit}
            />
            <Route
              path="/user-page"
              component={Main}
            />
            <Route
              path="/change-mdp"
              component={Changemdp}
            />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  fetchClothContent: PropTypes.func.isRequired,
};

// == Export
export default App;

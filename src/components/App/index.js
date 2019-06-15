// == Import : npm
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import './app.scss';

// peaufiner toute les size dès que toute l'inté est faite
import Signin from 'src/containers/Signin';
import Signup from 'src/containers/Signup';
import Profil from 'src/containers/Profil';
import AddCloth from 'src/containers/AddCloth';
import Wardrobe from 'src/containers/Wardrobe';
import FormAddCloth from 'src/containers/FormAddCloth';
import Random from 'src/containers/Random';
import Header from 'src/containers/Header';
import Main from 'src/containers/Main';
import Accueil from 'src/containers/Accueil';

import Footer from 'src/components/Footer';
import Changemdp from '../Profil/ChangeMdp';
import Outfit from '../Outfit';
import NoMatch from '../NoMatch';

// gerer le dé (png pour le moment)

//  import Sign from '../Sign';


// == Composant
class App extends Component {
  componentDidMount() {

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
              exact
              path="/signup"
              component={Signup}
            />
            <Route
              exact
              path="/wardrobe"
              component={Wardrobe}
            />
            <Route
              exact
              path="/profil"
              component={Profil}
            />
            <Route
              exact
              path="/random"
              component={Random}
            />
            <Route
              exact
              path="/add-new-cloth"
              component={AddCloth}
            />
            <Route
              exact
              path="/form-new-cloth"
              component={FormAddCloth}
            />
            <Route
              exact
              path="/outfit-id"
              component={Outfit}
            />
            <Route
              exact
              path="/user-page"
              component={Main}
            />
            <Route
              exact
              path="/change-mdp"
              component={Changemdp}
            />
            <Route component={NoMatch} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

// == Export
export default App;

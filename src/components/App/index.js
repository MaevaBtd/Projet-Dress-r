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
import Wardrobe from 'src/containers/Wardrobe';
import Accueil from 'src/components/Accueil';
import ClothList from 'src/containers/ClothList';
import Footer from 'src/components/Footer';
import Header from 'src/containers/Header';
import FormAddCloth from '../AddCloth/FormAddCloth';
import Main from '../Main';
import Changemdp from '../Profil/ChangeMdp';


import Outfit from '../Outfit';
import NoMatch from '../NoMatch';


import AddCloth from '../AddCloth';
// gerer le dé (png pour le moment)
import Random from '../Random';
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
            <Route
              exact
              path="/cloth-list"
              component={ClothList}
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

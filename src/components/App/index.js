// == Import : npm
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// == Import : local
import './app.scss';

import Accueil from 'src/components/Accueil';
import Footer from 'src/components/Footer';
import Header from '../Header ';
import Signin from '../Sign/Signin';
import Signup from '../Sign/Signup';
import Wardrobe from '../Wardrobe';
import Profil from '../Profil';
import Random from '../Random';
import AddCloth from '../AddCloth';
import Main from '../Main';

// == Composant
const App = () => (
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
          path="/profil"
          component={Profil}
        />
        <Route
          path="/user-page"
          component={Main}
        />

      </Switch>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
);

// == Export
export default App;

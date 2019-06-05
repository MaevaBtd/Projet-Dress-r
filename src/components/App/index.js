// == Import : npm
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// == Import : local
import './app.scss';

// peaufiner toute les size dès que toute l'inté est faite

import Accueil from 'src/components/Accueil';
import Footer from 'src/components/Footer';
import Header from '../Header ';

import FormAddCloth from '../AddCloth/FormAddCloth';
import Cloth from '../Cloth';
import ClothList from '../Cloth/ClothList';
import Main from '../Main';
import Changemdp from '../Profil/ChangeMdp';
import Profil from '../Profil';
import Signin from '../Sign/Signin';
import Signup from '../Sign/Signup';
import Outfit from '../Outfit';
import OutfitCard from '../Outfit/OutfitCard';
import OutfitList from '../Outfit/OutfitList';
import Wardrobe from '../Wardrobe';
import AddCloth from '../AddCloth';
// gerer le dé (png pour le moment)
import Random from '../Random';
//  import Sign from '../Sign';


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

    <Header />
    <Random />
    <Footer />
  </div>
);

// == Export
export default App;

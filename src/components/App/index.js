// == Import : npm
import React from 'react';

// == Import : local
import './app.scss';

import Accueil from 'src/components/Accueil';
import Footer from 'src/components/Footer';
import Header from '../Header ';
// btn submit display none mobile
import FormAddCloth from '../AddCloth/FormAddCloth';
// à faire
import AddCloth from '../AddCloth';
// à refaire
import Clothlist from '../Cloth/ClothList';
// à faire
import Cloth from '../Cloth';
import Main from '../Main';
import Changemdp from '../Profil/ChangeMdp';
import Profil from '../Profil';

// == Composant
const App = () => (
  <div id="app">
    <Header />
    <Profil />
    <Footer />
  </div>
);

// == Export
export default App;

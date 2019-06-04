// == Import : npm
import React from 'react';

// == Import : local
import './app.scss';

import Accueil from 'src/components/Accueil';
import Footer from 'src/components/Footer';
import Header from '../Header ';
import FormAddCloth from '../AddCloth/FormAddCloth';
import AddCloth from '../AddCloth';
import Clothlist from '../Cloth/ClothList';
import Cloth from '../Cloth';
import Main from '../Main';

// == Composant
const App = () => (
  <div id="app">
    <Header />
    <Main />
    <Footer />
  </div>
);

// == Export
export default App;

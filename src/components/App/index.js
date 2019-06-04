// == Import : npm
import React from 'react';

// == Import : local
import './app.scss';

import Accueil from 'src/components/Accueil';
import Footer from 'src/components/Footer';
import Header from '../Header ';
import FormAddCloth from '../AddCloth/FormAddCloth';

// == Composant
const App = () => (
  <div id="app">
    <Header />
    <FormAddCloth />
    <Footer />
  </div>
);

// == Export
export default App;

// == Import : npm
import React from 'react';

// == Import : local
import './app.scss';

import Accueil from 'src/components/Accueil';
// import Footer from 'src/components/Footer';

// == Composant
const App = () => (
  <div id="app">
    <Accueil />
  </div>
);

// == Export
export default App;

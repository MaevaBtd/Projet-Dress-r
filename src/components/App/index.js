// == Import : npm
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';


// == Import : local
import './app.scss';
import Footer from 'src/components/Footer';


library.add(fab);
// == Composant
const App = () => (
  <div id="app">
    <Footer />
  </div>
);

// == Export
export default App;
// == Import : npm
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

// == Import : local
import './app.scss';

import Footer from 'src/components/Footer';
// import AddCloth from '../AddCloth';
import Signup from '../Sign/Signup';
import FormAddCloth from '../AddCloth/FormAddCloth';
import Signin from '../Sign/Signin';


// == Composant
const App = () => (
  <div id="app">
    <FormAddCloth />
    <Footer />
  </div>
);

// == Export
export default App;

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
// today
import Signin from '../Sign/Signin';
import Signup from '../Sign/Signup';
//  import Sign from '../Sign';

// == Composant
const App = () => (
  <div id="app">
    <Header />
    <Signin />
    <Footer />
  </div>
);

// == Export
export default App;

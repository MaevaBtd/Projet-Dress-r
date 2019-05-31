// == Import : npm
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';


// == Import : local
import App from 'src/components/App';


// == Render
// 1. Le composant racine (celui qui contient l'ensemble de l'app)
const rootComponent = <App />;

// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');

// Le rendu de React => DOM
render(rootComponent, target);

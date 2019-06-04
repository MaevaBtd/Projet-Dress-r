// == Import: Yarn
import React from 'react';

// == Import: local
import './Wardrobe.scss';
import OutfitList from '../Outfit/OutfitList';
import ClothList from '../Cloth/ClothList';

// == Code
const Wardrobe = () => (
  <div id="wardrobe">
    <h1>Toutes mes tenues</h1>
    <OutfitList />
    <h1>Tous mes vêtements</h1>
    <ClothList />
  </div>
);

// == Export
export default Wardrobe;

// == Import: Yarn
import React from 'react';

// == Import: local
import './Wardrobe.scss';
import OutfitList from '../Outfit/OutfitList';
import ClothList from '../Cloth/ClothList';

// == Code
const Wardrobe = () => (
  <div id="wardrobe">
    <OutfitList />
    <ClothList />
  </div>
);

// == Export
export default Wardrobe;

// == Import: Yarn
import React from 'react';

// == Import: local
import OutfitList from 'src/containers/OutfitList';
import ClothList from 'src/containers/ClothList';
import './Wardrobe.scss';

// == Code
const Wardrobe = () => (
  <div id="wardrobe">
    <OutfitList />
    <ClothList />
  </div>
);

// == Export
export default Wardrobe;

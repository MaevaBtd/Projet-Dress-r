// == Import: Yarn
import React from 'react';

// == Import: local
import ClothList from 'src/containers/ClothList';
import './Wardrobe.scss';
import OutfitList from '../Outfit/OutfitList';


// == Code
const Wardrobe = ({ userCloth }) => (
  <div id="wardrobe">
    <OutfitList />
    <ClothList />
  </div>
);

// == Export
export default Wardrobe;

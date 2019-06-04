// == Import: Yarn
import React from 'react';

// == Import: local
import './OutfitList.scss';
import OutfitCard from './OutfitCard';

// == Code
const OutfitList = () => (
  <div id="outfitlist">
    <h1>Mes tenues</h1>
    <OutfitCard />
    <OutfitCard />
    <OutfitCard />
    <OutfitCard />
    <OutfitCard />
  </div>
  
);

// == Export
export default OutfitList;

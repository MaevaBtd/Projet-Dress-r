// == Import: Yarn
import React from 'react';
import { NavLink } from 'react-router-dom';

// == Import: local
import './OutfitList.scss';
import OutfitCard from './OutfitCard';

// == Code
const OutfitList = () => (
  <div id="outfitlist">
    <h1>Mes tenues</h1>
    <NavLink to="/outfit-id"><OutfitCard /></NavLink>
    <NavLink to="/outfit-id"><OutfitCard /></NavLink>
    <NavLink to="/outfit-id"><OutfitCard /></NavLink>
    <NavLink to="/outfit-id"><OutfitCard /></NavLink>
    <NavLink to="/outfit-id"><OutfitCard /></NavLink>
    <NavLink to="/outfit-id"><OutfitCard /></NavLink>
  </div>
  
);

// == Export
export default OutfitList;

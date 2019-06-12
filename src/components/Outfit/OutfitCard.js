// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './OutfitCard.scss';

// == Code
const OutfitCard = ({ name, cloths}) => (
  <div id="outfitcard">
    <div>
      <p> Nom de la tenue: {name}</p>
      <p>Catégorie:</p>
      <h3>Liste des vêtements :</h3>
      <ul>
        {cloths.map(cloth => (
          <li key={cloth.id}>{cloth.name}</li>
        ))}
      </ul>
    </div>
    <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
    <Button id="close-button" shape="circle">
      <Icon type="close" theme="outlined" />
    </Button>

  </div>
  
);

// == Export
export default OutfitCard;

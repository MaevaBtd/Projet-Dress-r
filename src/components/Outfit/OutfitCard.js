// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './OutfitCard.scss';

// == Code
const OutfitCard = () => (
  <a id="outfitcard">
    <div>
      <p> Nom de la tenue:</p>
      <p>Catégorie:</p>
      <h3>Liste des vêtements :</h3>
      <ul>
        <li>Vêtement 1</li>
        <li>Vêtement 2</li>
        <li>Vêtement 3</li>
        <li>Vêtement 4</li>
        <li>Vêtement 5</li>
      </ul>
    </div>
    <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
    <Button id="close-button" shape="circle">
      <Icon type="close" theme="outlined" />
    </Button>

  </a>
  
);

// == Export
export default OutfitCard;

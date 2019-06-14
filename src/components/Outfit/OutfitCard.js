// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './OutfitCard.scss';

// == Code
const OutfitCard = ({ id, name, cloths, onRemoveOutfit }) => (
  <div id="outfitcard">
    <div>
      <p> Nom de la tenue: <p className="dyna"> {name}</p></p>
      <p>Catégorie:</p>
      <h3>Liste des vêtements :</h3>
      <ul className="dyna">
        {cloths.map(cloth => (
          <li key={cloth.id}
            {...cloth}
            >{cloth.name}</li>
        ))}
      </ul>
    </div>
    <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
    <Button id="close-button" shape="circle" onClick={onRemoveOutfit}>
      <Icon type="close" theme="outlined" />
    </Button>

  </div>
);

OutfitCard.propTypes = {
  // id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cloths: PropTypes.array.isRequired,
  onRemoveOutfit: PropTypes.func.isRequired,
};

// == Export
export default OutfitCard;

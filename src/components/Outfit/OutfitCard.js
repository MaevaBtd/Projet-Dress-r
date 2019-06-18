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
      <p> Nom de la tenue: <span className="dyna"> {name}</span></p>
      <p>Liste des vêtements:</p>
      <ul className="dyna">
        {cloths.map(cloth => (
          <li key={cloth.id}
            {...cloth}
            >{cloth.name}</li>
        ))}
      </ul>
    </div>
    <Icon id="close-button" type="close-circle" theme="filled" onClick={onRemoveOutfit} />
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

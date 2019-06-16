// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './Cloth.scss';

// == Code
const Cloth = ({ id, name, image, styles, type, onRemoveCloth }) => (
  <a id="clothcard">
    <div id="clothcard-content">
      <p>Nom du vêtement: <span className="dyna">{name}</span></p>
      <p>Catégorie:{styles.map(style => (
        <span className="dyna" key={style.id}> {style.name} </span>
      ))}
      </p>
      {/* <p>Type:<span className="dyna">{type.name}</span></p> */}
    </div>
    <img src={image} alt="" />
    <Icon id="close-button" type="close-circle" theme="filled" onClick={onRemoveCloth} />
  </a>
);

// Cloth.propTypes = {
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   styles: PropTypes.array.isRequired,
//   type: PropTypes.object.isRequired,
//   onRemoveCloth: PropTypes.func.isRequired,
// };

// == Export
export default Cloth;

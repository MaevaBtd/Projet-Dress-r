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
    <div>
      <p>Nom du vêtement: {name} </p>
      <p>Catégorie:{styles.map(style => (
        <span key={style.id}> {style.name} </span>
      ))}
      </p>
      <p>Type: {type.name} </p>
    </div>
    <img src={image} alt="" />
    <Button id="close-button" shape="circle" onClick={onRemoveCloth}>
      <Icon type="close" theme="outlined" />
    </Button>
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

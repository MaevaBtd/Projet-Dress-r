// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Cloth.scss';

// == Code
const Cloth = ({ name, image, styles, type }) => (
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
    <Button id="close-button" shape="circle">
      <Icon type="close" theme="outlined" />
    </Button>
  </a>
);

// == Export
export default Cloth;

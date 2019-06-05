// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Cloth.scss';

// == Code
const Cloth = () => (
  <a id="clothcard">
    <div>
      <p>Nom du vêtement:</p>
      <p>Catégorie:</p>
      <p>Type:</p>
    </div>
    <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" alt="" />
    <Button id="close-button" shape="circle">
      <Icon type="close" theme="outlined" />
    </Button>
  </a>
);

// == Export
export default Cloth;

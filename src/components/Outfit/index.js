// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Outfit.scss';
import Cloth from '../Cloth';

// == Code
const Outfit = () => (
  <div id="clothlist">
    <h1>Nom de la Tenue</h1>
    <Cloth />
    <Button shape="circle" >
      <Icon type="delete" theme="filled" />
    </Button>
    <Cloth />
    <Button shape="circle" >
      <Icon type="delete" theme="filled" />
    </Button>
    <Cloth />
    <Button shape="circle" >
      <Icon type="delete" theme="filled" />
    </Button>
    <Cloth />
    <Button shape="circle" >
      <Icon type="delete" theme="filled" />
    </Button>
    <Cloth />
    <Button shape="circle" >
      <Icon type="delete" theme="filled" />
    </Button>
  </div>
);

// == Export
export default Outfit;

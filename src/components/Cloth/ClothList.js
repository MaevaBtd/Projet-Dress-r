// == Import: Yarn
import React from 'react';
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './ClothList.scss';
import Cloth from '.';

// == Code
const ClothList = () => (
  <div id="clothlist">
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
export default ClothList;

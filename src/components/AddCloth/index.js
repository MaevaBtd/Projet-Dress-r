// == Import: Yarn
import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './AddCloth.scss';

// == Code
const AddCloth = () => (
  <div id="addcloth">
    <h1 id="title-add-cloth">Ajouter un Vêtement</h1>
    <h2 id="desc-add-cloth">Cliquez sur la partie du corps pour laquelle vous souhaitez ajouter un vêtement</h2>
    <div id="full-babouche-man">
      <img id="babouche-man" src="src/data/assets/baboucheman.png" alt="" />
      <Button id="hat" shape="round" icon="plus" />
      <Button id="tshirt" shape="circle" icon="plus" />
      <Button id="vest" shape="circle" icon="plus" />
      <Button id="pants" shape="circle" icon="plus" />
      <Button id="shoes" shape="circle" icon="plus" />
    </div>
  </div>
);

// == Export
export default AddCloth;

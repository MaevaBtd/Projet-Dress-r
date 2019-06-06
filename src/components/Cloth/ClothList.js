// == Import: Yarn
import React from 'react';
import {
  Button,
  Form,
  Select,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './ClothList.scss';
import Cloth from '.';

// == Code
const ClothList = () => (
  <div id="clothlist">
    <Form>
      <h1 id="title-cloth-list">Liste de vos vêtements</h1>
      <Button id="button-cloth-list" type="primary" htmlType="submit">
        Ajouter un nouveau vêtement
      </Button>
      <Form.Item>
        <div className="category-add-cloth">
          <Select
            placeholder="Catégorie (sport, soirée, décontracté...)"
          />
        </div>
      </Form.Item>
      <Form.Item>
        <div className="category-add-cloth">
          <Select
            placeholder="Type de vêtement (haut, bas, chapeau...)"
          />
        </div>
      </Form.Item>
    </Form>
    <div id="cloth-list">
      <Cloth />
      <Cloth />
      <Cloth />
      <Cloth />
      <Cloth />
      <Cloth />
    </div>
  </div>
);

// == Export
export default ClothList;

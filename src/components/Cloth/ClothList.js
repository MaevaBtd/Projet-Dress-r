// == Import: Yarn
import React from 'react';
import {
  Button,
  Icon,
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
      <Button id="button-add-cloth" type="primary" htmlType="submit">
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
      <div className="unique-cloth">
        <Cloth />
        <Button shape="circle">
          <Icon type="delete" theme="filled" />
        </Button>
      </div>
      <div className="unique-cloth">
        <Cloth />
        <Button shape="circle">
          <Icon type="delete" theme="filled" />
        </Button>
      </div>
      <div className="unique-cloth">
        <Cloth />
        <Button shape="circle">
          <Icon type="delete" theme="filled" />
        </Button>
      </div>
      <div className="unique-cloth">
        <Cloth />
        <Button shape="circle">
          <Icon type="delete" theme="filled" />
        </Button>
      </div>
      <div className="unique-cloth">
        <Cloth />
        <Button shape="circle">
          <Icon type="delete" theme="filled" />
        </Button>
      </div>
      <div className="unique-cloth">
        <Cloth />
        <Button shape="circle">
          <Icon type="delete" theme="filled" />
        </Button>
      </div>
    </div>
  </div>
);

// == Export
export default ClothList;

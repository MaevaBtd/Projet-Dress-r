// == Import: Yarn
import React from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './FormAddCloth.scss';

// == Code
const FormAddCloth = () => (
  <Form className="addcloth">
    <Form.Item>
      <Input
        prefix={<Icon type="skin" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Nom du vêtement"
      />
    </Form.Item>
    <Form.Item>
      <Select
        placeholder="Catégorie (sport, soirée, décontracté...)"
      />
    </Form.Item>
    <Form.Item label="Ajouter une photo">
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button>
          <Icon type="upload" /> Cliquez pour uploader une photo
        </Button>
      </Upload>,
    </Form.Item>
    <Form.Item label="Votre vêtement est-il d'un seul tenant? ">
      <Checkbox.Group >
        <Row>
          <Col span={8}>
            <Checkbox value="Oui">Oui</Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="Non">
             Non
            </Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>,
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Valider
      </Button>
    </Form.Item>
  </Form>
);

// == Export
export default FormAddCloth;

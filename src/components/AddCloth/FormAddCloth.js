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
    <h1 id="title-formaddcloth">Ajouter un vêtement</h1>
    <Form.Item>
      <Input
        className="input-add-cloth"
        prefix={<Icon type="skin" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Nom du vêtement"
      />
    </Form.Item>
    <Form.Item>
      <div className="category-add-cloth">
        <Select
          placeholder="Catégorie (sport, soirée, décontracté...)"
        />
      </div>
    </Form.Item>
    <Form.Item>
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button>
          <Icon type="upload" /> Cliquez pour uploader une photo
        </Button>
      </Upload>
    </Form.Item>
    <Form.Item className="label-add-cloth" label="Votre vêtement est-il d'un seul tenant? ">
      <Radio.Group className="radio-add-cloth">
        <Row>
          <Col span={8}>
            <Radio className="radio-left" value="Oui">Oui</Radio>
          </Col>
          <Col span={8}>
            <Radio className="radio-right" value="Non">
             Non
            </Radio>
          </Col>
        </Row>
      </Radio.Group>
    </Form.Item>
    <Form.Item>
      <Button id="button-add-cloth" type="primary" htmlType="submit">
        Valider
      </Button>
    </Form.Item>
  </Form>
);

// == Export
export default FormAddCloth;

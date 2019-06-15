// == Import: Yarn
import React from 'react';
import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Upload,
  Icon,
  Row,
  Col,
  Spin,
} from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';

// == Import: local
import './FormAddCloth.scss';

// == Code
class FormAddCloth extends React.Component {
  componentDidMount() {
    const { fetchStyles } = this.props;
    fetchStyles();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { addClothRequest, loading } = this.props;
    addClothRequest();
    loading();
  }

  handleChange = (evt) => {
    // Je recup la value : Problématique du DOM
    const { value } = evt.target;
    // Je recup la prop venant du container
    const { onInputChange } = this.props;

    onInputChange(value);
  }

  handleStyleChange = (value) => {
    // Je recup la prop venant du container
    const { onStyleChange } = this.props;

    onStyleChange(value);
  }

  handleChangePart = (evt) => {
    const { onChangePart } = this.props;
    console.log('change bool', evt.target.value);
    onChangePart(evt.target.value);
  }

  render() {
    const { Option } = Select;
    const { categories, isAuthenticated, loadingAddCloth, errorAddCloth, redirectAddCloth } = this.props;

    if (!isAuthenticated) return <Redirect to="/" />;
    if (redirectAddCloth) return <Redirect to="/add-new-cloth" />;
    return (
      <Spin spinning={loadingAddCloth}>
        <Form className="addcloth" onSubmit={this.handleSubmit}>
          <h1 id="title-formaddcloth">Ajouter un vêtement</h1>
          <div>{errorAddCloth}</div>
          <Form.Item>
            <Input
              className="input-add-cloth"
              prefix={<Icon type="skin" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nom du vêtement"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <div className="category-add-cloth">
              <Select
                placeholder="Catégorie (sport, soirée, décontracté...)"
                onChange={this.handleStyleChange}
              >
                {categories.map(category => (
                  <Option key={category.id} value={category.name}>{category.name}</Option>
                ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item>
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Cliquez pour uploader une photo
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <h2 className="label-add-cloth">Votre vêtement est-il d'un seul tenant? (Robe, combinaison, tunique ...) </h2>
            <Radio.Group className="radio-add-cloth" onChange={this.handleChangePart}>
              <Row>
                <Col span={8}>
                  <Radio className="radio-left" value={true}>Oui</Radio>
                </Col>
                <Col span={8}>
                  <Radio className="radio-right" value={false}>
                  Non
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button id="button-add-cloth" type="primary" htmlType="submit" >
              Valider
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      
    );
  }
}

// == Export
export default FormAddCloth;

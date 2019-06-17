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
  Switch,
  message,
} from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';

// == Import: local
import './FormAddCloth.scss';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1243774_rzn5op8nr7l.js',
});


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

  handlePictureSelected = (evt) => {
    const { selectedPicture } = this.props;

    const image = evt.target.files[0];
    selectedPicture(image);
    console.log(image);
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

  handleChangePart = (checked) => {
    const { onChangePart } = this.props;
    console.log('change bool', checked);
    onChangePart(checked);
  }

  render() {
    const { Option } = Select;
    const { categories, isAuthenticated, loadingAddCloth, errorAddCloth, redirectAddCloth, type } = this.props;
    let onePart;

    if (!isAuthenticated) return <Redirect to="/" />;
    if (redirectAddCloth) return <Redirect to="/add-new-cloth" />;

    if (type === 'haut') {
      onePart = (
        <Form.Item>
          <h2 className="label-add-cloth">Votre vêtement est-il d'un seul tenant? (Robe, combinaison, tunique ...) </h2>
          <Switch
            id="switch"
            checkedChildren={<IconFont style={{ fontSize: '1.5em' }} type="diceDress-" />}
            unCheckedChildren={<IconFont style={{ fontSize: '1.5em' }} type="dicetshirt" />}
            onChange={this.handleChangePart}
          />
        </Form.Item>
      );
    } 

    return (
      <Spin spinning={loadingAddCloth}>
        <Form className="addcloth" onSubmit={this.handleSubmit}>
          <h1 id="title-formaddcloth">Ajouter un vêtement</h1>
          <div id="form">
            <h2 id="cloth-name">Nom du vêtement:</h2>
            <Form.Item>
              <Input
                className="input-add-cloth"
                prefix={<Icon type="skin" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Nom du vêtement"
                onChange={this.handleChange}
              />
            </Form.Item>
            <h2>Catégorie:</h2>
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
              <h2>Ajoutez une photo de votre vêtement:</h2>
              <Button>
                <input
                  type="file"
                  name="image"
                  accept=".jpg, .png, .jpeg"
                  onChange={this.handlePictureSelected}
                />
              </Button>
            </Form.Item>
            {onePart}
            <Form.Item>
              <Button id="button-add-cloth" type="primary" htmlType="submit" >
                Valider
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    );
  }
}

// == Export
export default FormAddCloth;

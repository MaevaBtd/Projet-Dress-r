// == Import: Yarn
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Select,
  Form,
  Spin,
  Icon,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Random.scss';
import Cloth from '../Cloth';

// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Random extends React.Component {
  componentDidMount() {
    const { fetchStyles } = this.props;
    fetchStyles();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('submit');
  }

  handleStyleChange = (value) => {
    // Je recup la prop venant du container
    const { onStyleChange } = this.props;
    onStyleChange(value);
  }

  render() {
    const { Option } = Select;
    const { isAuthenticated, categories } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="random">
        <h1>Tenue aléatoire</h1>
        <h2>Choisissez la catégorie de la tenue souhaitée et cliquez sur le dé pour la générer aléatoirement parmis les vêtements de votre garde-robe</h2>
        <Spin spinning={false} size="large">
          <Form className="random-form">
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
              <a href=""><img id="icon-dice" src="src/data/assets/Dice.png" alt="" onClick={this.handleSubmit} /></a>
            </Form.Item>
          </Form>
        </Spin>

        <div id="tenue-random">
          {/* <Cloth />
          <Cloth />
          <Cloth />
          <Cloth />
          <Cloth /> */}
        </div>
      </div>
    )
  }
}


// == Export
export default Random;

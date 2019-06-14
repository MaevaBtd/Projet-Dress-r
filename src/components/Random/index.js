// == Import: Yarn
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Select,
  Form,
  Button,
  Spin,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Random.scss';
import Cloth from '../Cloth';

// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Random extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="random">
        <h1>Tenue aléatoire</h1>
        <h2>Choisissez la catégorie de la tenue souhaitée et cliquez sur le dé pour la générer aléatoirement parmis les vêtements de votre garde-robe</h2>
        <div>
          <Spin spinning={false} size="large">
            <Form className="random-form">
              <Form.Item>
                <div className="category-random-cloth">
                  <Select
                    placeholder="Catégorie (sport, soirée, décontracté...)"
                  />
                </div>
              </Form.Item>
            </Form>
          </Spin>
          <img id="dice" src="src/data/assets/Dice.png" alt="" />
        </div>
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

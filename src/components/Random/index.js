// == Import: Yarn
import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Select,
  Form,
  Spin,
  Icon,
  Modal,
  Button,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Random.scss';
import Cloth from '../Cloth';

// Import dice icon from iconfont.cn
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1243774_4xxfahkooh.js',
});

// == Code
class Random extends React.Component {
  componentDidMount() {
    const { fetchStyles } = this.props;
    fetchStyles();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('submit');
    const { loadingDice, fetchRandom, styles } = this.props;
    loadingDice();
    console.log(styles);
    fetchRandom(styles);
  }

  handleStyleChange = (value) => {
    // Je recup la prop venant du container
    const { onStyleChange } = this.props;
    console.log('id:', value);
    onStyleChange(value);
  }

  handleCancel = () => {
    const { closeModal } = this.props;
    console.log('modal fermée1');
    closeModal();
  };

  render() {
    const { Option } = Select;
    const { isAuthenticated, categories, loadingRandom, errorRandom, modalShow, receivedCloths, styles } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    console.log(receivedCloths);
    return (
      <div id="random">
        <h1>Tenue aléatoire</h1>
        <h2>Choisissez la catégorie de la tenue souhaitée et cliquez sur le dé pour la générer aléatoirement parmis les vêtements de votre garde-robe</h2>
        
        <Form className="random-form">
          <Spin spinning={loadingRandom} size="large">
            <Form.Item>
              <div className="category-add-cloth">
                <Select
                  placeholder="Catégorie (sport, soirée, décontracté...)"
                  onChange={this.handleStyleChange}
                >
                  {categories.map(category => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
          </Spin>
          <Form.Item>
            <a href="" onClick={this.handleSubmit}><IconFont type="dicedice" style={{ fontSize: '20em', color: '#4a858f' }} spin={loadingRandom} /></a>
          </Form.Item>
        </Form>
        <Modal
          id="random-modal"
          visible={modalShow}
          title={`Nouvelle tenue de style ${styles}`}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="back"
              onClick={this.handleCancel}
            >
              Annuler
            </Button>,
            <Button
              key="submit"
              type="primary"
            // onClick={this.handleOk}
            >
              Sauvegarder la tenue
            </Button>,
          ]}
        >
          <div>{errorRandom}</div>
          <div id="randomCloths">
            {receivedCloths.map(cloth => (
              <div key={cloth.id} className="randomCloth">
                <h3>Type de vêtement: Tête </h3>
                <h3>Nom du vêtement: {cloth.name}</h3>
                <img src={cloth.image} alt="" width="60px" />
              </div>
            ))}
          </div>

        </Modal>
      </div>
    )
  }
}


// == Export
export default Random;

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
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './Random.scss';
// import Cloth from '../Cloth';

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

  componentWillUnmount() {
    const { cleanState, cleanStyleState } = this.props;
    cleanState();
    cleanStyleState();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('submit');
    const {
      loadingDice,
      fetchRandom,
      styles,
      deleteErrorMessage,
    } = this.props;
    loadingDice();
    // console.log(styles);
    fetchRandom(styles);
    deleteErrorMessage();
  }

  handleStyleChange = (value) => {
    // Je recup la prop venant du container
    const { onStyleChange } = this.props;
    // console.log('id:', value);
    onStyleChange(value);
  }

  handleCancel = () => {
    const { closeModal, deleteErrorMessage, cleanStyleState, cleanState } = this.props;
    // console.log('modal fermée1');
    closeModal();
    deleteErrorMessage();
    cleanStyleState();
    cleanState();
  };

  handleOk = () => {
    const { closeModal, requestAddOutfit } = this.props;
    closeModal();
    requestAddOutfit();
    // console.log('render func addoutfit');
  };

  handleChange = (evt) => {
    // Je recup la value : Problématique du DOM
    const { value } = evt.target;
    // Je recup la prop venant du container
    const { onInputChange, receivedCloths, receivedClothId } = this.props;
    onInputChange(value);
    const clothIdArray = receivedCloths.map(cloth => cloth.id);
    receivedClothId(clothIdArray);
  };

  render() {
    const { Option } = Select;
    const {
      isAuthenticated,
      categories,
      loadingRandom,
      errorRandom,
      modalShow,
      receivedCloths,
    } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    // console.log(receivedCloths);
    return (
      <div id="random">
        <h1>Dress'Me</h1>

        <div id="error-random">{errorRandom}</div>
        <h2>Bienvenue sur l'application Dress'Me !</h2>
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
          title="Nouvelle tenue aléatoire"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              id="confirm-modal"
              key="back"
              onClick={this.handleCancel}
            >
              Annuler
            </Button>,
            <Button
              id="cancel-modal"
              key="submit"
              type="primary"
              onClick={this.handleOk}
            >
              Sauvegarder la tenue
            </Button>,
          ]}
        >
          <div>{errorRandom}</div>
          <Input
            // value={name}
            className="input-outfit-name"
            placeholder="Donnez un nom à votre tenue"
            onChange={this.handleChange}
          />
          <div id="randomCloths">
            {receivedCloths.map(cloth => (
              <div key={cloth.id} className="randomCloth">
                <h3 className="modal-txt">Type de vêtement: {cloth.type_name} </h3>
                <h3 className="modal-txt">Nom du vêtement: {cloth.name}</h3>
                <img src={`../../../public/uploads/images/${cloth.image}`} alt="" width="60px" />
              </div>
            ))
            }
          </div>

        </Modal>
      </div>
    );
  }
}

Random.propTypes = {
  fetchStyles: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  requestAddOutfit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  loadingDice: PropTypes.func.isRequired,
  fetchRandom: PropTypes.func.isRequired,
  styles: PropTypes.array.isRequired,
  deleteErrorMessage: PropTypes.func.isRequired,
  onStyleChange: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  receivedCloths: PropTypes.array.isRequired,
  receivedClothId: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  loadingRandom: PropTypes.bool.isRequired,
  errorRandom: PropTypes.string.isRequired,
};

// == Export
export default Random;

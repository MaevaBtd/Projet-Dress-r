import React from 'react';
import {
  Button,
  Form,
  Spin,
  Modal,
  Input,
  Radio,
  Row,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// == Import Local
import './AddOutfit.scss';
import Cloth from 'src/containers/Cloth';

// == Code 
class FormAddOutfit extends React.Component {
  componentDidMount() {
    const { fetchStyles, fetchUserCloth } = this.props;
    fetchStyles();
    fetchUserCloth();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { addAllCloth, modalShow, getNewOutfit, allCloths, head, coat, top, pants, shoes } = this.props;
    console.log('submit', head, coat, top, pants, shoes);
    addAllCloth([...head, ...coat, ...top, ...pants, ...shoes]);
    // getNewOutfit(allCloths);
    modalShow();
    console.log('get new ', allCloths);
  }

  handleCancel = () => {
    const { closeModal, deleteErrorMessage, deleteStateCloth } = this.props;
    // console.log('modal fermée1');
    closeModal();
    this.forceUpdate();
    // deleteErrorMessage();
  };

  handleOk = (evt) => {
    const { closeModal, requestAddOutfit } = this.props;
    closeModal();
    requestAddOutfit();
  };

  onHeadChange = (evt) => {
    console.log('change tête', evt.target.value);
    const { changeHead } = this.props;
    changeHead(evt.target.value);
  }

  onCoatChange = (evt) => {
    console.log('change coat');
    const { changeCoat } = this.props;
    changeCoat(evt.target.value);
  }

  onTopChange = (evt) => {
    console.log('change top');
    const { changeTop } = this.props;
    changeTop(evt.target.value);
  }

  onPantsChange = (evt) => {
    console.log('change Pants');
    const { changePants } = this.props;
    changePants(evt.target.value);
  }

  onShoesChange = (evt) => {
    console.log('change Shoes');
    const { changeShoes } = this.props;
    changeShoes(evt.target.value);
  }

  handleChange = (evt) => {
    // Je recup la value : Problématique du DOM
    const { value } = evt.target;
    // Je recup la prop venant du container
    const { onInputChange } = this.props;
    onInputChange(value);
  };

  render() {
    const { isAuthenticated, clothsList, showModal } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    // console.log(receivedCloths);
    return (
      <div id="add-outfit">
        <h1>Créer une nouvelle tenue</h1>
        <h2>Choisissez des vêtements dans votre garde-robe</h2>
        <Spin spinning={false} size="large">
          <Form className="add-outfit-form" onSubmit={this.handleSubmit}>
            <Form.Item>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.onHeadChange}>
                <h2 className="label-add-cloth">Tête</h2>
                <Row>
                  {clothsList.filter(cloth => cloth.type.name === 'tête').map(cloth => (
                    <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                      <Cloth
                        key={cloth.id}
                        {...cloth}
                      />
                    </Radio>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.onCoatChange}>
                <h2 className="label-add-cloth">Veste</h2>
                <Row>
                  {clothsList.filter(cloth => cloth.type.name === 'veste').map(cloth => (
                    <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                      <Cloth
                        key={cloth.id}
                        {...cloth}
                      />
                    </Radio>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.onTopChange}>
                <h2 className="label-add-cloth">Haut / Robes / Combinaisons</h2>
                <Row>
                  {clothsList.filter(cloth => cloth.type.name === 'haut').map(cloth => (
                    <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                      <Cloth
                        key={cloth.id}
                        {...cloth}
                      />
                    </Radio>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.onPantsChange}>
                <h2 className="label-add-cloth">Bas</h2>
                <Row>
                  {clothsList.filter(cloth => cloth.type.name === 'bas').map(cloth => (
                    <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                      <Cloth
                        key={cloth.id}
                        {...cloth}
                      />
                    </Radio>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.onShoesChange}>
                <h2 className="label-add-cloth">Chaussures</h2>
                <Row>
                  {clothsList.filter(cloth => cloth.type.name === 'chaussures').map(cloth => (
                    <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                      <Cloth
                        key={cloth.id}
                        {...cloth}
                      />
                    </Radio>
                  ))}
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
        <Modal
          id="random-modal"
          visible={showModal}
          title="Nouvelle tenue"
          onOk={this.handleOk}
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
              onClick={this.handleOk}
            >
              Sauvegarder la tenue
            </Button>,
          ]}
        >
        {/* // <div>{errorRandom}</div> */}
          <Input
            // value={name}
            className="input-outfit-name"
            placeholder="Donnez un nom à votre tenue"
            onChange={this.handleChange}
          />

        </Modal>
      </div>
    );
  }
}

export default FormAddOutfit;

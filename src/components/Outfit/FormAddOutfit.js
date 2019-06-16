import React from 'react';
import { Button,
  Icon,
  Form,
  Spin,
  Select,
  Modal,
  Input,
  Radio,
  Col,
  Row } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// == Import Local
import Cloth from 'src/containers/Cloth';

// == Code 
class FormAddOutfit extends React.Component {
  componentDidMount() {
    const { fetchStyles, fetchUserCloth } = this.props;
    fetchStyles();
    fetchUserCloth();
  }

  render() {
    const { Option } = Select;
    const { isAuthenticated, categories, clothsList } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    // console.log(receivedCloths);
    return (
      <div id="random">
        <h1>Créer une nouvelle tenue</h1>
        <h2>Choisissez la catégorie de la tenue souhaitée et séléctionnez des vêtements dans votre garde-robe</h2>
        <Spin spinning={false} size="large">
          <Form className="random-form">
            <Form.Item>
              <div className="category-add-cloth">
                <Select
                  placeholder="Catégorie (sport, soirée, décontracté...)"
                  //onChange={this.handleStyleChange}
                >
                  {categories.map(category => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                  ))}
                </Select>
              </div>
            </Form.Item>
            <Form.Item>
              <Button id="button-add-cloth" type="primary" htmlType="submit" >
                Valider
              </Button>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.handleChangePart}>
                <h2 className="label-add-cloth">Tête</h2>
                <Row>
                  <Col span={8}>
                    {clothsList.filter(cloth => cloth.type.name === 'tête').map(cloth => (
                      <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                        <Cloth
                          key={cloth.id}
                          {...cloth}
                        />
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.handleChangePart}>
                <h2 className="label-add-cloth">Veste</h2>
                <Row>
                  <Col span={8}>
                    {clothsList.filter(cloth => cloth.type.name === 'tête').map(cloth => (
                      <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                        <Cloth
                          key={cloth.id}
                          {...cloth}
                        />
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.handleChangePart}>
                <h2 className="label-add-cloth">Haut / Robes / Combinaisons</h2>
                <Row>
                  <Col span={8}>
                    {clothsList.filter(cloth => cloth.type.name === 'haut').map(cloth => (
                      <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                        <Cloth
                          key={cloth.id}
                          {...cloth}
                        />
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.handleChangePart}>
                <h2 className="label-add-cloth">Bas</h2>
                <Row>
                  <Col span={8}>
                    {clothsList.filter(cloth => cloth.type.name === 'bas').map(cloth => (
                      <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                        <Cloth
                          key={cloth.id}
                          {...cloth}
                        />
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Radio.Group className="radio-add-cloth" onChange={this.handleChangePart}>
                <h2 className="label-add-cloth">Chaussures</h2>
                <Row>
                  <Col span={8}>
                    {clothsList.filter(cloth => cloth.type.name === 'chaussures').map(cloth => (
                      <Radio key={cloth.id} className="radio-outfit" value={cloth.id}>
                        <Cloth
                          key={cloth.id}
                          {...cloth}
                        />
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
            
          </Form>
        </Spin>
        <Modal
          id="random-modal"
          // visible={modalShow}
          title="Nouvelle tenue aléatoire"
          // onOk={this.handleOk}
         // onCancel={this.handleCancel}
          footer={[
            <Button
              key="back"
            //  onClick={this.handleCancel}
            >
              Annuler
            </Button>,
            <Button
              key="submit"
              type="primary"
            //  onClick={this.handleOk}
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
          //  onChange={this.handleChange}
          />
          {/* <div id="randomCloths">
            {receivedCloths.map(cloth => (
              <div key={cloth.id} className="randomCloth">
                <h3>Type de vêtement: Tête </h3>
                <h3>Nom du vêtement: {cloth.name}</h3>
                <img src={cloth.image} alt="" width="60px" />
              </div>
            ))}
          </div> */}

        </Modal>
      </div>
    );
  }
}

export default FormAddOutfit;

// == Import: Yarn
import React from 'react';
import {
  Form,
  Select,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// == Import: local
import './ClothList.scss';
import Cloth from 'src/containers/Cloth';

// == Code
class ClothList extends React.Component {
  componentDidMount() {
    const { fetchUserCloth, fetchStyles, fetchTypes } = this.props;
    fetchUserCloth();
    fetchStyles();
    fetchTypes();
  }

  handleStyleChange = (value) => {
    // Je recup la prop venant du container
    const { onStyleChange } = this.props;
    console.log('change cloth style');
    onStyleChange(value);
  }

  handleTypeChange = (evt) => {
    const { onChangePart } = this.props;
    console.log('change cloth part');
    onChangePart(evt.target.value);
  }

  render() {
    const { Option } = Select;
    const {
      clothsList,
      isAuthenticated,
      categories,
      types,
    } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="clothlist">
        <Form>
          <h1 id="title-cloth-list">Liste de vos vêtements</h1>
          <Form.Item>
            <div className="category-add-cloth">
              <Select
                placeholder="Catégorie (sport, soirée, décontracté...)"
                // onChange={this.handleStyleChange}
              >
                {categories.map(category => (
                  <Option key={category.id} value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="category-add-cloth">
              <Select
                placeholder="Type de vêtement (haut, bas, chapeau...)"
              >
                {types.map(type => (
                  <Option key={type.id} value={type.id}>{type.name}</Option>
                ))}
              </Select>
            </div>
          </Form.Item>
        </Form>
        <div id="cloth-list">
          {
            clothsList.map(cloth => (
              <Cloth
                key={cloth.id}
                {...cloth}
              />
            ))
          }

        </div>
      </div>
    );
  }
}

ClothList.propTypes = {
  fetchUserCloth: PropTypes.func.isRequired,
  clothsList: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchStyles: PropTypes.func.isRequired,
  fetchTypes: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  onStyleChange: PropTypes.func.isRequired,
  onChangePart: PropTypes.func.isRequired,
};


// == Export
export default ClothList;

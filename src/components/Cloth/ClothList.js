// == Import: Yarn
import React from 'react';
import {
  Button,
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
    const { fetchUserCloth } = this.props;
    fetchUserCloth();
  }

  render() {
    const { clothsList, isAuthenticated } = this.props;
    
    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="clothlist">
        <Form>
          <h1 id="title-cloth-list">Liste de vos vêtements</h1>
          <Button id="button-cloth-list" type="primary" htmlType="submit">
            Ajouter un nouveau vêtement
          </Button>
          <Form.Item>
            <div className="category-add-cloth">
              <Select
                placeholder="Catégorie (sport, soirée, décontracté...)"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="category-add-cloth">
              <Select
                placeholder="Type de vêtement (haut, bas, chapeau...)"
              />
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
};


// == Export
export default ClothList;

// == Import: Yarn
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


// == Import: local
import OutfitList from 'src/containers/OutfitList';
import ClothList from 'src/containers/ClothList';
import './Wardrobe.scss';

// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Wardrobe extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) return <Redirect to="/" />;

    return (
      <div id="wardrobe">
        <OutfitList />
        <ClothList />
      </div>
    );
  }
}

Wardrobe.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

// == Export
export default Wardrobe;

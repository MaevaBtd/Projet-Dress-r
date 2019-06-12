// == Import: Yarn
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import: local
import './OutfitList.scss';
import OutfitCard from './OutfitCard';


// == Code
class OutfitList extends React.Component {
  componentDidMount() {
    const { fetchUserOutfits } = this.props;
    fetchUserOutfits();
  }

  render() {
    const { outfitsList } = this.props;
    return (
      <div id="outfitlist">
        <h1>Mes tenues</h1>
        {outfitsList.map(outfit => (
          <NavLink key={outfit.id} to={`/outfit-`+ outfit.id}>
            <OutfitCard
              key={outfit.id}
              name={outfit.name}
              cloths={outfit.cloths}
            />
          </NavLink>
        ))}

      </div>
    );
  }
}

OutfitList.propTypes = {
  fetchUserOutfits: PropTypes.func.isRequired,
  outfitsList: PropTypes.array.isRequired,
};


// == Export
export default OutfitList;

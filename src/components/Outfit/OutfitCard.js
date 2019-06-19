// == Import: Yarn
import React from 'react';
import { Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './OutfitCard.scss';

// == Code
class OutfitCard extends React.Component {
  handleShowRemoveOutfit = () => {
    // console.log('showdeletemodal');
    const { onRemoveOutfit, name } = this.props;
    Modal.confirm({
      title: `Etes vous sur de vouloir supprimer cette tenue? ${name}`,
      content: 'les vêtements que vous avez attribué à cette tenue ne serons pas supprimé. Vous pourrez toujours les retrouver dans votre garde-robe et les attribuer à une nouvelle tenue',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        // console.log('OK');
        onRemoveOutfit();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  render() {
    const { name, cloths } = this.props;
    return (
      <div id="outfitcard">
        <div>
          <p> Nom de la tenue: <span className="dyna"> {name}</span></p>
          <p>Vêtements de la tenue:</p>
          <ul className="dyna">
            {cloths.map(cloth => (
              <li
                key={cloth.id}
                {...cloth}
              >
                {cloth.name}
              </li>
            ))}
          </ul>
        </div>
        <Icon id="close-button" type="close-circle" theme="filled" onClick={this.handleShowRemoveOutfit} />
      </div>
    );
  }
}


OutfitCard.propTypes = {
  // id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cloths: PropTypes.array.isRequired,
  onRemoveOutfit: PropTypes.func.isRequired,
};

// == Export
export default OutfitCard;

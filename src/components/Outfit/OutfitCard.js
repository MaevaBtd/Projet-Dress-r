// == Import: Yarn
import React from 'react';
import { Icon, Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './OutfitCard.scss';

// == Code
class OutfitCard extends React.Component {
  handleShowRemoveOutfit = () => {
    console.log('showdeletemodal');
    const { onShowModal } = this.props;
    onShowModal();
  }

  handleCancel = () => {
    const { onShowModal } = this.props;
    onShowModal();
  }

  handleRemoveOutfit = () => {
    const { onShowModal, onRemoveOutfit } = this.props;
    onShowModal();
    onRemoveOutfit();
  }
  
  render() {
    const { name, cloths, showModalOutfit } = this.props;
    return (
      <div id="outfitcard">
        <div>
          <p> Nom de la tenue: <span className="dyna"> {name}</span></p>
          <p>Liste des vêtements:</p>
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
        <Modal
          id="random-modal"
          visible={showModalOutfit}
          title="Confirmation de suppression"
          onOk={this.handleRemoveOutfit}
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
              onClick={this.handleRemoveOutfit}
            >
              Supprimer
            </Button>,
          ]}
        >
          <h1>{name}</h1>
          <div>Etes vous sur de vouloir supprimer cette tenue ? </div>
          <h2>les vêtements que vous avez attribué à cette tenue ne serons pas supprimé.
          Vous pourrez toujours les retrouver dans votre garde-robe et les attribuer à une nouvelle tenue
          </h2>
        </Modal>
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

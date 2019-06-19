// == Import: Yarn
import React from 'react';
import {
  Icon,
  Modal,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import ImageZoom from 'react-medium-image-zoom';
import PropTypes from 'prop-types';

// == Import: local
import './Cloth.scss';


// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Cloth extends React.Component {
  handleShowRemoveCloth = () => {
    const { onShowModal } = this.props;
    onShowModal();
  }

  handleCancel = () => {
    const { onShowModal } = this.props;
    onShowModal();
  }

  handleRemoveCloth = () => {
    const { onShowModal, onRemoveCloth, id } = this.props;
    onShowModal();
    onRemoveCloth(id);
  }


  render() {
    const {
      id,
      name,
      image,
      styles,
      type,
      showModalDelete,
    } = this.props;

    return (
      <div id="clothcard">
        <div id="clothcard-content">
          <p>Nom du vêtement: <span className="dyna">{id}</span></p>
          <p>Catégorie:{styles.map(style => (
            <span className="dyna" key={style.id}> {style.name} </span>
          ))}
          </p>
          <p>Type:<span className="dyna">{type.name}</span></p>
        </div>
        <ImageZoom
          image={{
            src: `../../../public/uploads/images/${image}`,
            className: 'img',
          }}
          zoomImage={{
            src: `../../../public/uploads/images/${image}`,
          }}
        />

        {/* <img src={`../../../public/uploads/images/${image}`} alt="" /> */}
        <Icon id="close-button" type="close-circle" theme="filled" onClick={this.handleShowRemoveCloth} />
        <Modal
          id="random-modal"
          visible={showModalDelete}
          title="Confirmation de suppression"
          onOk={this.handleRemoveCloth}
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
              onClick={this.handleRemoveCloth}
            >
              Supprimer
            </Button>,
          ]}
        >
          <h1>{id}</h1>
          <div>Etes vous sur de vouloir supprimer ce vêtement? </div>
          <h2>Attention ce vêtement sera aussi supprimé des tenues auquelles vous l'avez attribué</h2>
        </Modal>
      </div>
    );
  }
}


Cloth.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  styles: PropTypes.array.isRequired,
  type: PropTypes.object.isRequired,
  onRemoveCloth: PropTypes.func.isRequired,
  showModalDelete: PropTypes.bool.isRequired,
  onShowModal: PropTypes.func.isRequired,
};

// == Export
export default Cloth;

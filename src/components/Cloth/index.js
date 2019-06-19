// == Import: Yarn
import React from 'react';
import {
  Icon,
  Modal,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import ImageZoom from 'react-medium-image-zoom';

// == Import: local
import './Cloth.scss';


// == Code
// eslint-disable-next-line react/prefer-stateless-function
class Cloth extends React.Component {
  handleShowRemoveCloth = () => {
    const { onRemoveCloth, name } = this.props;
    // onShowModal();
    Modal.confirm({
      title: `Etes vous sur de vouloir supprimer ce vêtement? ${name}`,
      content: 'Attention ce vêtement sera aussi supprimé des tenues auquelles vous l\'avez attribué',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk() {
        // console.log('OK');
        onRemoveCloth();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  handleCancel = () => {
    const { onShowModal } = this.props;
    onShowModal();
  }


  render() {
    const {
      name,
      image,
      styles,
      type,
    } = this.props;

    return (
      <div id="clothcard">
        <div id="clothcard-content">
          <p>Nom du vêtement: <span className="dyna">{name}</span></p>
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
  onShowModal: PropTypes.func.isRequired,
};

// == Export
export default Cloth;

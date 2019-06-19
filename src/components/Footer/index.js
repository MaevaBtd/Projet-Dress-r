// Import npm
import React from 'react';
import { Icon, Modal } from 'antd';

// import PropTypes from 'prop-types';

// Import local
import './footer.scss';


// Component
class Footer extends React.Component {
  handleModal = (evt) => {
    evt.preventDefault();
    Modal.info({
      title: 'Mentions Légales',
      content: (
        <div id="modal-footer-content">
          <h1 className="modal-footer"> Site développé en React.js et Symfony 4 par</h1>
          <p className="modal-footer">Anne Bouccin et Kevin Dumetz pour le Back-end</p>
          <p className="modal-footer">Maëva Bertrand et Maxime Maida pour le Front-end</p>
          <h3 className="modal-footer">Dans le cadre de la formation O'Clock - Promotion Quantum</h3>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    return (
      <div id="footer">
        <a href="#"><Icon className="icon-footer" type="facebook" theme="filled" /></a>
        <a href="#"><Icon className="icon-footer" type="twitter" /></a>
        <a href="#"><Icon className="icon-footer" type="instagram" /></a>
        <a id="legal-mentions" href="" onClick={this.handleModal}>Mentions Légales</a>
        <h3 id="footer-title">- &copy; Copyright - Dress'R 2019 </h3>
      </div>
    );
  }
}

// Export
export default Footer;

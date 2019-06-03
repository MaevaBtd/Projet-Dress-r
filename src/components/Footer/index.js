// Import npm
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import PropTypes from 'prop-types';

// Import local
import './footer.scss';

// Component
const Footer = () => (
  <div id="footer">
    <p id="footer-title">- &copy; Copyright - Dress'R 2019 </p>
    <a href="#"><FontAwesomeIcon size="2x" className="icon-footer" icon={['fab', 'facebook']} /></a>
    <a href="#"><FontAwesomeIcon size="2x" className="icon-footer" icon={['fab', 'twitter']} /></a>
    <a href="#"><FontAwesomeIcon size="2x" className="icon-footer" icon={['fab', 'instagram']} /></a>
  </div>
);

// Export
export default Footer;

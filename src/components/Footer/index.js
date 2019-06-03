// Import npm
import React from 'react';
import { Icon } from 'antd';

// import PropTypes from 'prop-types';

// Import local
import './footer.scss';

// Component
const Footer = () => (
  <div id="footer">
    <p id="footer-title">- &copy; Copyright - Dress'R 2019 </p>
    <a href="#"><Icon className="icon-footer" type="facebook" theme="filled" /></a>
    <a href="#"><Icon className="icon-footer" type="twitter" /></a>
    <a href="#"><Icon className="icon-footer" type="instagram" /></a>
  </div>
);

// Export
export default Footer;

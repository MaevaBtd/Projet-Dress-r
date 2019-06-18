// == Import: Yarn
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

import baboucheman from 'src/data/assets/baboucheman.png';

// == Import: local
import './AddCloth.scss';

// == Code
// eslint-disable-next-line react/prefer-stateless-function
class AddCloth extends React.Component {
  componentDidMount() {
    const { stopRedirect } = this.props;
    stopRedirect();
  }

  componentWillUnmount() {
    const { cleanErrorMessage } = this.props;
    cleanErrorMessage();
  }

  render() {
    const {
      addTypeHead,
      addTypeBot,
      addTypeTop,
      addTypeShoes,
      addTypeVest,
      isAuthenticated,
      errorAddCloth,
    } = this.props;

    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="addcloth">
        <h1 id="title-add-cloth">Ajouter un Vêtement</h1>
        <div id="error-add-cloth">{errorAddCloth}</div>
        <h2 id="desc-add-cloth">Cliquez sur la partie du corps pour laquelle vous souhaitez ajouter un vêtement</h2>
        <div id="full-babouche-man">
          <img id="babouche-man" src={baboucheman} alt="" />
          <NavLink to="/form-new-cloth" onClick={addTypeHead}><Icon className="icon-babouch" id="hat" type="plus-circle" theme="filled" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeTop}><Icon className="icon-babouch" id="tshirt" type="plus-circle" theme="filled" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeVest}><Icon className="icon-babouch" id="vest" type="plus-circle" theme="filled" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeBot}><Icon className="icon-babouch" id="pants" type="plus-circle" theme="filled" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeShoes}><Icon className="icon-babouch" id="shoes" type="plus-circle" theme="filled" /></NavLink>
        </div>
      </div>
    );
  }
}


AddCloth.propTypes = {
  addTypeBot: PropTypes.func.isRequired,
  addTypeHead: PropTypes.func.isRequired,
  addTypeShoes: PropTypes.func.isRequired,
  addTypeTop: PropTypes.func.isRequired,
  addTypeVest: PropTypes.func.isRequired,
  stopRedirect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorAddCloth: PropTypes.string.isRequired,
  cleanErrorMessage: PropTypes.func.isRequired,
};

// == Export
export default AddCloth;

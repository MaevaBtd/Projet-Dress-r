// == Import: Yarn
import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { Button } from 'antd';
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

  render() {
    const { addTypeHead, addTypeBot, addTypeTop, addTypeShoes, addTypeVest, isAuthenticated, errorAddCloth } = this.props;
    
    if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <div id="addcloth">
        <h1 id="title-add-cloth">Ajouter un Vêtement</h1>
        <div>{errorAddCloth}</div>
        <h2 id="desc-add-cloth">Cliquez sur la partie du corps pour laquelle vous souhaitez ajouter un vêtement</h2>
        <div id="full-babouche-man">
          <img id="babouche-man" src={baboucheman} alt="" />
          <NavLink to="/form-new-cloth" onClick={addTypeHead}><Button id="hat" shape="round" icon="plus" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeTop}><Button id="tshirt" shape="circle" icon="plus" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeVest}><Button id="vest" shape="circle" icon="plus" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeBot}><Button id="pants" shape="circle" icon="plus" /></NavLink>
          <NavLink to="/form-new-cloth" onClick={addTypeShoes}><Button id="shoes" shape="circle" icon="plus" /></NavLink>
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
};

// == Export
export default AddCloth;

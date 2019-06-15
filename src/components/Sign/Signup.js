// == Import: Yarn
import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Spin,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// == Import: local
import './Signup.scss';

// == Code
class Signup extends React.Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { userSignupRequest, loadingChange } = this.props;
    userSignupRequest();
    loadingChange();
  }

  handleChange = (evt) => {
    // Je recup la value : Problématique du DOM
    const { value } = evt.target;
    // Je recup la prop venant du container
    const { onInputChange } = this.props;

    onInputChange(value);
  }

  handlePwdChange = (evt) => {
    // Je recup la value : Problématique du DOM
    const { value } = evt.target;
    // Je recup la prop venant du container
    const { onPwdChange } = this.props;

    onPwdChange(value);
  }



  render() {
    // Vars
    const { username, password, isAuthenticated, loading, errorMessage } = this.props;

    if (isAuthenticated) return <Redirect to="/user-page" />;

    return (
      <Spin spinning={loading} tip="Connexion en cours...">
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <h1>Entrez vos identifiants</h1>
          <div>{errorMessage}</div>
          <Form.Item>
            <Input
              value={username}
              className="input-signup"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={password}
              className="input-signup"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.handlePwdChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      
    );
  }
}

Signup.propTypes = {
  // action : changer la valeur de input dans le state
  onInputChange: PropTypes.func.isRequired,
  onPwdChange: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
  // data : la valeur du champ
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

// == Export
export default Signup;

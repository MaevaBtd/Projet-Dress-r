// == Import: Yarn
import React from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
  Spin,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './Signin.scss';

// == Code
class Signin extends React.Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { userSigninRequest, loading } = this.props;
    userSigninRequest();
    loading();
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

  handleConfirmPwdChange = (evt) => {
    const { value } = evt.target;
    const { onConfirmPwdChange } = this.props;

    onConfirmPwdChange(value);
  }

  handleEmailChange = (evt) => {
    const { value } = evt.target;
    const { onEmailChange } = this.props;

    onEmailChange(value);
  }

  render() {
    // Vars

    const {
      username,
      password,
      confirmPwd,
      email,
      loadingNewUser,
      newUserMessage,
    } = this.props;


    return (
      <Spin spinning={loadingNewUser} tip="Création du compte en cours...">
        <Form id="signin" onSubmit={this.handleSubmit}>
          <h1>Inscription</h1>
          <div id="form">
            <h2 id="email">E-mail:</h2>
            <Form.Item>
              <Input
                className="input-signin"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-mail"
                value={email}
                onChange={this.handleEmailChange}
              />
            </Form.Item>
            <h2>Mot de passe:</h2>
            <Form.Item>
              <Input.Password
                className="input-signin"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                value={password}
                onChange={this.handlePwdChange}
              />
            </Form.Item>
            <h2>Confirmez Mot de passe:</h2>
            <Form.Item>
              <Input.Password
                className="input-signin"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={this.handleConfirmPwdChange}
              />
            </Form.Item>
            <h2>Pseudo:</h2>
            <Form.Item>
              <Input
                value={username}
                className="input-signin"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Pseudo"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                id="button"
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
              <div id="msg-confirm">{newUserMessage}</div>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    );
  }
}

Signin.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onPwdChange: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired,
  onConfirmPwdChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPwd: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.func.isRequired,
  loadingNewUser: PropTypes.bool.isRequired,
  newUserMessage: PropTypes.string.isRequired,
};

// == Export
export default Signin;

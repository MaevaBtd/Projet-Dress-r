// == Import: Yarn
import React from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

// == Import: local
import './Signin.scss';

// == Code
class Signin extends React.Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { userSigninRequest } = this.props;
    userSigninRequest();
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
    const { username, password } = this.props;

    return (
      <Form id="signin" onSubmit={this.handleSubmit}>
        <h2 id="email">E-mail:</h2>
        <Form.Item>
          <Input
            className="input-signin"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="E-mail"
          />
        </Form.Item>
        <h2 className="password">Password:</h2>
        <Form.Item>
          <Input.Password
            className="input-signin"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            value={password}
            onChange={this.handlePwdChange}
          />
        </Form.Item>
        <h2 className="password">Confirm Password:</h2>
        <Form.Item>
          <Input.Password
            className="input-signin"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <h2 id="pseudo">Pseudo:</h2>
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
        </Form.Item>
      </Form>
    );
  }
}

Signin.propTypes = {
  // action : changer la valeur de input dans le state
  onInputChange: PropTypes.func.isRequired,
  onPwdChange: PropTypes.func.isRequired,
  userSigninRequest: PropTypes.func.isRequired,
  // data : la valeur du champ
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

// == Export
export default Signin;

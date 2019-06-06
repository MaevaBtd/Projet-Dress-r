// == Import: Yarn
import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Icon,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Signin.scss';

// == Code
const Signin = () => (
  <Form id="signin">
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
        className="input-signin"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Pseudo"
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

// == Export
export default Signin;

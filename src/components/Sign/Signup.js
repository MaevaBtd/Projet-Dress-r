// == Import: Yarn
import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Signup.scss';

// == Code
const Signup = () => (
  <Form className="login-form">
    <h1>Entrez vos identifiants</h1>
    <Form.Item>
      <Input
        className="input-signup"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Username"
      />
    </Form.Item>
    <Form.Item>
      <Input
        className="input-signup"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Log in
      </Button>
    </Form.Item>
  </Form>
);

// == Export
export default Signup;

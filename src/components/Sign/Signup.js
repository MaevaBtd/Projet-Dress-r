// == Import: Yarn
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Signup.scss';

// == Code
const Signup = () => (
  <Form className="login-form">
    <Form.Item>
      <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Username"
      />
    </Form.Item>
    <Form.Item>
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Checkbox>Remember me</Checkbox>
      <a className="login-form-forgot" href="">
        Forgot password
      </a>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Log in
      </Button>
      Or <a href="">register now!</a>
    </Form.Item>
  </Form>
);

// == Export
export default Signup;

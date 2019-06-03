// == Import: Yarn
import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
} from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './Sign.scss';

// == Code
const Signin = () => (
  <Form>
    <Form.Item label="E-mail">
      <Input />
    </Form.Item>
    <Form.Item label="Password" hasFeedback>
      <Input.Password />
    </Form.Item>
    <Form.Item label="Confirm Password" hasFeedback>
      <Input.Password />
    </Form.Item>
    <Form.Item
      label={
        <span>
          Nickname&nbsp;
          <Tooltip title="What do you want others to call you?">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      }
    >
      <Input />
    </Form.Item>
    <Form.Item label="Captcha" extra="We must make sure that your are a human.">
      <Row gutter={8}>
        <Col span={12}>
          <Input />
        </Col>
        <Col span={12}>
          <Button>Get captcha</Button>
        </Col>
      </Row>
    </Form.Item>
    <Form.Item >
      <Checkbox>
        I have read the <a href="">agreement</a>
      </Checkbox>
    </Form.Item>
    <Form.Item >
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
  </Form>
);

// == Export
export default Signin;

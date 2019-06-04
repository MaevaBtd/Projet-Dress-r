// == Import: Yarn
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css';

// == Import: local
import './ChangeMdp.scss';

// == Code
const ChangeMdp = () => (
  <Form className="change-pwd-form">
    <Form.Item>
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Ancien Mot de passe"
      />
    </Form.Item>
    <Form.Item>
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="Nouveau Mot de passe"
      />
    </Form.Item>
    <Form.Item>
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="Répétez le nouveau Mot de passe"
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="valider">
        Valider
      </Button>
      <a href="">Annuler</a>
    </Form.Item>
  </Form>
);

// == Export
export default ChangeMdp;

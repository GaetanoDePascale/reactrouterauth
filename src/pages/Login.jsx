import { Button, Col, Form, Input, notification, Row } from 'antd';
import React, { useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { rowGutter } from '../utils';
import { doAxiosGet } from '../utils/AxiosCall';

const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    if ((username === 'admin' && password === 'admin') || (username === 'user' && password === 'user')) {
      let tokenFilename = '@not_found';
      let decodedTokenFilename = '@not_found';
      switch (username) {
        case 'admin':
          tokenFilename = '@token_admin';
          decodedTokenFilename = '@decode_token_admin';
          break;
        case 'user':
          tokenFilename = '@token_user';
          decodedTokenFilename = '@decode_token_user';
          break;
        default:
          break;
      }
      const token = await doAxiosGet(tokenFilename, props);
      const decodedToken = await doAxiosGet(decodedTokenFilename, props);

      if (token.executionResult && decodedToken.executionResult && decodedToken.data) {
        login({
          token: token.data.token,
          username: decodedToken.data.username,
          role: decodedToken.data.username === 'admin' ? 'admin' : 'user',
        });
        return;
      }
    }
    notification.error({
      message: 'Errore',
      description: 'Login o password non corretta!',
      placement: 'topRight',
    });
  };

  const [form] = Form.useForm();

  return (
    <div style={{ left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)', width: '300px' }}>
      <Form
        form={form}
        name="frmLogin"
        autoComplete="off"
        layout={'vertical'}
        className="ant-advanced-search-form"
        onFinish={handleSubmit}
        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
        onKeyDown={(e) => (e.keyCode === 13 ? e.preventDefault() : undefined)}
      >
        <Row gutter={[...rowGutter]}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form.Item
              label={'UserName'}
              name="username"
              rules={[{ required: true, message: 'Campo obbligatorio' }]}
              tooltip="Inserire admin per simulare una corretta login"
            >
              <Input placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[...rowGutter]}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form.Item
              label={'Password'}
              name="password"
              rules={[{ required: true, message: 'Campo obbligatorio' }]}
              tooltip="Inserire admin per simulare una corretta login"
            >
              <Input.Password placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row gutter={[...rowGutter]}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" style={{ borderRadius: '15%' }}>
                Login
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Button
                type="ghost"
                onClick={() => {
                  form.resetFields();
                }}
                style={{ borderRadius: '15%' }}
              >
                Annulla
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';

import { add } from '../../store/todo';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Select } from 'antd';

const Addtodo = () => {
  const [completed, setComplted] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    //event.preventDefault();
    dispatch(add({ title, completed }));
    setTitle('');
    setComplted(false);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        name="frmLogin"
        autoComplete="off"
        layout={'vertical'}
        className="ant-advanced-search-form"
        onFinish={handleSubmit}
        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
        onKeyDown={(e) => (e.keyCode === 13 ? e.preventDefault() : undefined)}
        initialValues={{
          title,
          completed,
        }}
      >
        <Form.Item label={'Task name'} name="title" rules={[{ required: true, message: 'Campo obbligatorio' }]}>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} />
        </Form.Item>

        <Form.Item label={'Status'} name="completed" rules={[{ required: true, message: 'Campo obbligatorio' }]}>
          <Select id="demo-simple-select" name="completed" label="completed" onChange={(event) => setComplted(event)}>
            <Select.Option value={false} key={'pending'}>
              Pending
            </Select.Option>
            <Select.Option value={true} key={'completed'}>
              Completed
            </Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ borderRadius: '15%' }}>
          Add task
        </Button>
      </Form>
    </>
  );
};

export default Addtodo;

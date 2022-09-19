import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, fetchTodos } from '../../store/todo';
import { DeleteOutlined } from '@ant-design/icons';

const TodoList = () => {
  const { data, status } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === 'loading') {
    return <h3>Loading</h3>;
  }

  return (
    <>
      <Table
        columns={[
          {
            title: 'S.no',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
          },
          {
            title: 'Task title',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
          },
          {
            title: 'Status',
            dataIndex: 'completed',
            key: 'completed',
            width: '40%',
            render: (text, _record, _index) => (text ? 'Completed' : 'Pending'),
          },
          {
            title: '',
            dataIndex: '',
            key: '',
            width: '10%',
            render: (_text, record, _index) => (
              <Button
                shape="circle"
                size="small"
                type="primary"
                icon={
                  <DeleteOutlined
                    title={'Elimina'}
                    onClick={() => {
                      dispatch(remove(record.id));
                    }}
                  />
                }
              />
            ),
          },
        ]}
        dataSource={data}
      />
    </>
  );
};

export default TodoList;

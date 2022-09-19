import { Button, Table, Input, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, fetchTodos } from '../../store/todo';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const TodoList = () => {
  const { data, status } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === 'loading') {
    return <h3>Loading</h3>;
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  return (
    <>
      <Table
        columns={[
          {
            title: 'S.no',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            sorter: (a, b) => a.id - b.id,
          },
          {
            title: 'Task title',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
            ...getColumnSearchProps('title'),
          },
          {
            title: 'Status',
            dataIndex: 'completed',
            key: 'completed',
            width: '40%',
            filters: [
              {
                text: 'Completed',
                value: true,
              },
              {
                text: 'Pending',
                value: false,
              },
            ],
            onFilter: (value, record) => record.completed === value,
            sorter: (a, b) => a.completed - b.completed,
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
                key={'deleteButton_' + record.id}
                icon={
                  <DeleteOutlined
                    key={'deleteIcon_' + record.id}
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

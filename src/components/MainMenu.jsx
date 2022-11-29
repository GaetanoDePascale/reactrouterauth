import React, { useState } from 'react';
import { UngroupOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, CalendarOutlined, UnorderedListOutlined, WindowsOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const MainMenu = (props) => {
  const [defaultOpenKeys] = useState([]);
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const px = props.collapsed ? '80' : '200';

  const menuItems = [
    { key: '/home', label: 'Home Page', icon: <HomeOutlined /> },
    {
      key: '/menu2',
      label: 'Menu 2',
      icon: <CalendarOutlined />,
      children: [
        { key: '/submenu21', label: 'SubMenu 2.1', icon: <CalendarOutlined /> },
        { key: '/submenu22', label: 'SubMenu 2.2', icon: <UnorderedListOutlined /> },
      ],
    },
    { key: '/menu3', label: 'Menu 3', icon: <UngroupOutlined /> },
    { key: '/componenttest', label: 'Modal', icon: <WindowsOutlined /> },
  ];

  return (
    <div style={{ position: 'fixed', flex: '0 0 ' + px + 'px', maxWidth: px + 'px', minWidth: px + 'px', width: px + 'px' }}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: props.toggle,
        title: props.collapsed ? 'Espandi menu' : 'Riduci menu',
      })}
      <Menu theme={'light'} selectedKeys={[props.activeItemId]} defaultOpenKeys={defaultOpenKeys} onClick={props.handleMenuClick} items={menuItems} />
    </div>
  );
};

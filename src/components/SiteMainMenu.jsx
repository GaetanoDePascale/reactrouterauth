import React, { useState } from 'react';
import {
  UngroupOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CalculatorOutlined,
  UnorderedListOutlined,
  PlayCircleOutlined,
  CloseOutlined,
  OrderedListOutlined,
  FontColorsOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const SiteMainMenu = (props) => {
  const [defaultOpenKeys] = useState([]);
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const px = props.collapsed ? '80' : '200';

  const menuItems = [
    { key: '/site/home', label: 'Home Page', icon: <HomeOutlined /> },
    {
      key: '/site/userprofile',
      label: 'User Profile',
      icon: <UngroupOutlined />,
    },
    {
      key: '/site/numberconversion',
      label: 'Number conversion',
      icon: <CalculatorOutlined />,
    },
    {
      key: '/site/recursivecomponent',
      label: 'Recursive Component',
      icon: <OrderedListOutlined />,
    },
    {
      key: '/site/todolistapplication',
      label: 'ToDo List Application',
      icon: <UnorderedListOutlined />,
    },
    {
      key: '/site/games',
      label: 'Games',
      icon: <PlayCircleOutlined />,
      children: [
        {
          key: '/site/games/tictactoe',
          label: 'Tic Tac Toe',
          icon: <CloseOutlined />,
        },
        {
          key: '/site/games/wordle',
          label: 'Wordle',
          icon: <FontColorsOutlined />,
        },
      ],
    },
  ];

  return (
    <div style={{ position: 'fixed', flex: '0 0 ' + px + 'px', maxWidth: px + 'px', minWidth: px + 'px', width: px + 'px' }}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: props.toggle,
        title: props.collapsed ? 'Espandi menu' : 'Riduci menu',
      })}
      <Menu theme={'light'} selectedKeys={[props.activeItemId]} defaultOpenKeys={defaultOpenKeys} onClick={props.handleMenuClick} items={menuItems}></Menu>
    </div>
  );
};

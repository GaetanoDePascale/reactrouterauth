import { Avatar, Col, Popover, Row, Space } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { LogoutOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';

export const UserBox = () => {
  const { logout } = useAuth();

  const userData = JSON.parse(localStorage.getItem('user'));

  const userTitleBox = (
    <>
      <Row gutter={[16, 16]}>
        <Col span={20}>Benvenuto, {userData.username}</Col>
        <Col span={4}>
          <LogoutOutlined
            title="Logout"
            onClick={() => {
              logout();
            }}
          />
        </Col>
      </Row>
    </>
  );
  const userInfoBox = (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>{userData.role}</Col>
      </Row>
    </>
  );
  return (
    <Popover title={userTitleBox} content={userInfoBox}>
      <Space size={'large'}>
        <Avatar icon={<UserOutlined />} />
        <DownOutlined />
      </Space>
    </Popover>
  );
};

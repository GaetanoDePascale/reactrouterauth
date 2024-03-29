import { FloatButton, Col, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MainMenu } from './MainMenu';
import Title from 'antd/lib/typography/Title';
import { UserBox } from './UserBox';
import { SiteMainMenu } from './SiteMainMenu';

const { Header, Sider, Content, Footer } = Layout;

const ProtectedLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState('Application');
  const [pageSubtitle, setPageSubtitle] = useState('');
  const { user } = useAuth();

  const userData = JSON.parse(localStorage.getItem('user'));
  const [admin] = useState(userData.role === 'admin');

  const navigate = useNavigate();
  const [activeItemId, setActiveItemId] = useState(() => {
    const initialItemId = admin ? '/' : '/site/home';
    navigate(initialItemId, { replace: true });
    return initialItemId;
  });

  useEffect(() => {
    setPageSubtitle('');
  }, [activeItemId]);

  const handleMenuClick = (e) => {
    const newItemId = e.key;
    if (newItemId !== activeItemId) {
      setActiveItemId(newItemId);
      navigate(newItemId, { replace: true });
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <FloatButton.BackTop />
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} theme={'light'} breakpoint="lg" collapsedWidth="80" onBreakpoint={(broken) => setCollapsed(broken)} collapsed={collapsed}>
          {admin ? (
            <MainMenu activeItemId={activeItemId} handleMenuClick={handleMenuClick} collapsed={collapsed} toggle={toggle} />
          ) : (
            <SiteMainMenu activeItemId={activeItemId} handleMenuClick={handleMenuClick} collapsed={collapsed} toggle={toggle} />
          )}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row style={{ width: '100%' }}>
              <Col span={24}>
                <div style={{ width: '100%', textAlign: 'center', paddingLeft: '15px', verticalAlign: 'middle' }}>
                  <div style={{ float: 'left', width: 'calc(100% - 200px)' }}>
                    <Title style={{ textAlign: 'center', verticalAlign: 'middle', margin: 'auto' }} ellipsis={true}>
                      {pageTitle}
                    </Title>
                  </div>
                  <div style={{ float: 'right', width: '200px', textAlign: 'right', paddingRight: '15px', verticalAlign: 'middle' }}>
                    <UserBox />
                  </div>
                </div>
              </Col>
            </Row>
          </Header>
          <Content className="site-layout" style={{ padding: '0 25px', marginTop: 10 }}>
          <div style={{ width: '100%', textAlign: 'center', paddingLeft: '15px', verticalAlign: 'middle' }}>
            <Title level={3} style={{ textAlign: 'center', verticalAlign: 'middle' }} ellipsis={true}>
              {pageSubtitle}
            </Title>
          </div>
          <div className="site-layout-background" style={{ padding: 24, minHeight: '80vh' }}>
            {activeItemId && (
              <Outlet
                context={[setPageTitle, setPageSubtitle]}
                parentActiveItemId={activeItemId}
              />
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Test© 2022</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default ProtectedLayout;

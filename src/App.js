import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import './styles.css';
import 'antd/dist/antd.min.css';
import TicTacToeGame from './pages/tictactoe/TicTacToeGame';

// import { LoginPage } from './pages/Login';
// import { HomePage } from './pages/Home';
// import { ProtectedLayout } from './components/ProtectedLayout';
// import { Menu3 } from './pages/Menu3';
// import { SubMenu22 } from './pages/SubMenu22';
// import { SubMenu21 } from './pages/SubMenu21';
// import { SiteHomePage } from './pages/SiteHome';
// import { UserProfile } from './pages/UserProfile';
// import { NumberConversion } from './pages/NumberConversion';

const LoginPage = React.lazy(() => import('./pages/Login'));
const HomePage = React.lazy(() => import('./pages/Home'));
const ProtectedLayout = React.lazy(() => import('./components/ProtectedLayout'));
const Menu3 = React.lazy(() => import('./pages/Menu3'));
const SubMenu22 = React.lazy(() => import('./pages/SubMenu22'));
const SubMenu21 = React.lazy(() => import('./pages/SubMenu21'));
const SiteHomePage = React.lazy(() => import('./pages/SiteHome'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const NumberConversion = React.lazy(() => import('./pages/NumberConversion'));
const TodoListApplication = React.lazy(() => import('./pages/todolistapplication/TodoListApplication'));

export default function App() {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/" element={<ProtectedLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="submenu21" element={<SubMenu21 />} />
          <Route path="submenu22" element={<SubMenu22 />} />
          <Route path="menu3" element={<Menu3 />} />
        </Route>
        <Route path="/site" element={<ProtectedLayout />}>
          <Route path="home" element={<SiteHomePage />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="numberconversion" element={<NumberConversion />} />
          <Route path="todolistapplication" element={<TodoListApplication />} />
          <Route path="games/tictactoe" element={<TicTacToeGame />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { HomePage } from './pages/Home';
import { ProtectedLayout } from './components/ProtectedLayout';

import './styles.css';
import 'antd/dist/antd.min.css';
import { Menu3 } from './pages/Menu3';
import { SubMenu22 } from './pages/SubMenu22';
import { SubMenu21 } from './pages/SubMenu21';
import { SiteHomePage } from './pages/SiteHome';
import { UserProfile } from './pages/UserProfile';
import { NumberConversion } from './pages/NumberConversion';

export default function App() {
  return (
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
      </Route>
    </Routes>
  );
}

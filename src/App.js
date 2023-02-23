import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import './styles.css';
// import 'antd/dist/antd.min.css';
import { wordList } from './pages/wordle';

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
const TicTacToeGame = React.lazy(() => import('./pages/tictactoe/TicTacToeGame'));
const DataComponent = React.lazy(() => import('./pages/recursivecomponent/DataComponent'));
const WordleGame = React.lazy(() => import('./pages/wordle/WordleGame'));
const ComponentTest = React.lazy(() => import('./pages/ComponentTest'));
const ConditionalWrapperPage = React.lazy(() => import('./pages/conditionalwrapper/ConditionalWrapperPage'));
const LandingBluetooth = React.lazy(() => import('./pages/bluetoothapp/LandingBluetooth'));
const LandingBluetoothBeacon = React.lazy(() => import('./pages/bluetoothapp/LandingBluetoothBeacon'));
const LandingReactBluetooth = React.lazy(() => import('./pages/bluetoothapp/LandingReactBluetooth'));
const RandomNumber = React.lazy(() => import('./pages/RandomNumber'));
const ReducerComponent = React.lazy(() => import('./pages/reducer/ReducerComponent'));
const GoogleSheetViewer = React.lazy(() => import('./pages/googlesheet/GoogleSheetViewer'));
const UseWorkersApp = React.lazy(() => import('./pages/useworkers/UseWorkersApp'));

//const TestPage = React.lazy(() => import('./pages/testpage/TestPage'));

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
          <Route path="componenttest" element={<ComponentTest />} />
        </Route>
        <Route path="/site" element={<ProtectedLayout />}>
          <Route path="home" element={<SiteHomePage />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="numberconversion" element={<NumberConversion />} />
          <Route path="recursivecomponent" element={<DataComponent />} />
          <Route path="conditionalwrapper" element={<ConditionalWrapperPage />} />
          <Route path="todolistapplication" element={<TodoListApplication />} />
          <Route path="games/tictactoe" element={<TicTacToeGame />} />
          <Route path="games/wordle" element={<WordleGame {...{ wordList, solution: wordList[Math.floor(Math.random() * wordList.length)], nbRows: 5, nbCols: 5 }} />} />
          <Route path="bluetooth/landing" element={<LandingBluetooth />} />
          <Route path="bluetooth/beacon" element={<LandingBluetoothBeacon />} />
          <Route path="bluetooth/reactbluetooth" element={<LandingReactBluetooth />} />
          <Route path="randomnumber" element={<RandomNumber />} />
          <Route path="reducercomponent/new" element={<ReducerComponent key={'emptyReducerComponent'} />} />
          <Route path="reducercomponent/:id" element={<ReducerComponent key={'filledReducerComponent'} initPageObject={{ name: 'test', description: 'prova descrizione' }} />} />
          <Route path="googlesheetviewer" element={<GoogleSheetViewer />} />
          <Route path="useworkers" element={<UseWorkersApp />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

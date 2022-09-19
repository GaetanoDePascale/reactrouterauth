import { Col, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { store } from '../../store';
import Addtodo from './AddToDo';
import TodoList from './TodoList';

const TodoListApplication = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Todo List Application');
  }, [setPageTitle, setPageSubtitle]);

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDimenion]);

  const getDivider = () => {
    if (windowDimenion.winWidth >= 1200) {
      return (
        <Col xs={0} md={0} xl={1}>
          <Divider type="vertical" style={{ height: '100%' }} />
        </Col>
      );
    } else {
      return <Divider />;
    }
  };

  return (
    <Provider store={store}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24} xl={7}>
          <Addtodo />
        </Col>
        {getDivider()}
        <Col xs={24} md={24} xl={16}>
          <TodoList />
        </Col>
      </Row>
    </Provider>
  );
};

export default TodoListApplication;

import { useEffect } from 'react';
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

  return (
    <Provider store={store}>
      <div className="app">
        <Addtodo />
        <TodoList />
      </div>
    </Provider>
  );
};

export default TodoListApplication;

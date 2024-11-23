import React from 'react';
import { TodosProvider } from './todos/context';
import { Footer, Header, TodoList } from './todos/components';


export const App: React.FC = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList />
          <Footer />
        </div>
      </div>
    </TodosProvider>
  );
};

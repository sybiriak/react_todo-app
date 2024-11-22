import { createContext, useState } from 'react';
import { Todo } from '../types';
import { useLocalStorage } from '../hooks';
import { Filter } from '../enums';

type Context = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TodosContext = createContext<Context>({
  todos: [],
  setTodos: () => {},
  filter: Filter.all,
  setFilter: () => {},
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  return (
    <TodosContext.Provider value={{ todos, setTodos, filter, setFilter }}>
      {children}
    </TodosContext.Provider>
  );
};

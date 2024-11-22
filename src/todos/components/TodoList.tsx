import React, { useMemo } from 'react';
import { useTodos } from '../hooks';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';
import { Filter } from '../enums';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filter } = useTodos();

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleChange = (changedTodo: Todo) => {
    const index = todos.findIndex(todo => todo.id === changedTodo.id);

    if (index === -1) {
      return;
    }

    const newTodos = [...todos];

    newTodos.splice(index, 1, changedTodo);
    setTodos(newTodos);
  };

  const visibleTodos = useMemo<Todo[]>(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.active:
          return !todo.completed;
        case Filter.completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onChange={handleChange}
        />
      ))}
    </section>
  );
};

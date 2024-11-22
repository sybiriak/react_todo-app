import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTodos } from '../hooks';

export const Header: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      inputRef.current?.focus();

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: normalizedTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleToggleAll = () => {
    const toggle = todos.every(todo => todo.completed);

    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !toggle,
      })),
    );
  };

  const isAllTodosCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form noValidate onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

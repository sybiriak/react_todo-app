import React from 'react';
import classNames from 'classnames';
import { useTodos } from '../hooks';
import { Filter } from '../enums';

const filters: string[] = Object.values(Filter);

export const Footer: React.FC = () => {
  const { todos, setTodos, filter, setFilter } = useTodos();

  if (!todos.length) {
    return '';
  }

  const handleFilterSelection = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const element = event.target as HTMLElement;

    if (element.nodeName !== 'A') {
      return;
    }

    const filterValue = element.innerText;

    setFilter(filterValue as Filter);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = activeTodosCount !== todos.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter" onClick={handleFilterSelection}>
        {filters.map(f => (
          <a
            key={f}
            href={`#/${f.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: f === filter,
            })}
            data-cy={`FilterLink${f}`}
          >
            {f}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

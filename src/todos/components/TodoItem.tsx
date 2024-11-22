import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onChange: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onChange }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
    }
  }, [isEditMode]);

  function saveChanges() {
    const title = newTitle.trim();

    if (!title) {
      onDelete(todo.id);
      setIsEditMode(false);

      return;
    }

    onChange({ ...todo, title });
    setIsEditMode(false);
  }

  function cancelChanges() {
    setIsEditMode(false);
    setNewTitle(todo.title);
  }

  const handleEscapeKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Escape') {
      return;
    }

    cancelChanges();
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          aria-label={`Mark as ${todo.completed ? 'incomplete' : 'complete'}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={event =>
            onChange({ ...todo, completed: event.target.checked })
          }
        />
      </label>

      {isEditMode ? (
        <form noValidate onSubmit={saveChanges}>
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={saveChanges}
            onKeyUp={handleEscapeKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditMode(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

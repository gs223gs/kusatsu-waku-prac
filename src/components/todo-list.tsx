'use client';

import { Todo } from './todo-types';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

export function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-sm text-gray-500">No tasks yet. Add your first one above.</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm"
        >
          <button
            type="button"
            onClick={() => onToggle(todo.id)}
            className="flex flex-1 items-center gap-2 text-left"
          >
            <span
              aria-hidden
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                todo.done ? 'border-black bg-black text-white' : 'border-gray-300'
              }`}
            >
              {todo.done ? '✓' : ''}
            </span>
            <span className={todo.done ? 'text-gray-400 line-through' : ''}>{todo.text}</span>
          </button>

          <button
            type="button"
            onClick={() => onRemove(todo.id)}
            className="text-sm text-gray-400 transition hover:text-black"
            aria-label={`Remove ${todo.text}`}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

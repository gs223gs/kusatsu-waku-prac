'use client';

import { FormEvent, useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = inputValue.trim();

    if (!text) return;

    setTodos((current) => [{ id: Date.now(), text, done: false }, ...current]);
    setInputValue('');
  };

  const handleToggle = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const remainingCount = todos.filter((todo) => !todo.done).length;

  return (
    <section className="mt-6 max-w-md space-y-6">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 rounded-md border border-gray-200 bg-white p-3 shadow-sm"
      >
        <label className="sr-only" htmlFor="todo-input">
          Add a new task
        </label>
        <input
          id="todo-input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Buy milk"
          className="flex-1 rounded border border-gray-200 px-3 py-2 text-base focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </form>

      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks yet. Add your first one above.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(todo.id)}
                  className="flex flex-1 items-center gap-2 text-left"
                >
                  <span
                    aria-hidden
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                      todo.done
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {todo.done ? '✓' : ''}
                  </span>
                  <span className={todo.done ? 'text-gray-400 line-through' : ''}>
                    {todo.text}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRemove(todo.id)}
                  className="text-sm text-gray-400 transition hover:text-black"
                  aria-label={`Remove ${todo.text}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-gray-500">
          {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
        </p>
      </div>
    </section>
  );
}

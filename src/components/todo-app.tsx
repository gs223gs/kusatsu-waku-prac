'use client';

import { useState } from 'react';

import { TodoForm } from './todo-form';
import { TodoList } from './todo-list';
import { Todo } from './todo-types';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
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
      <TodoForm value={inputValue} onChange={setInputValue} onSubmit={handleAddTodo} />

      <div className="space-y-3">
        <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />

        <p className="text-xs text-gray-500">
          {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
        </p>
      </div>
    </section>
  );
}

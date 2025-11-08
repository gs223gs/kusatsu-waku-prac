'use client';

import { useState } from 'react';

import { TodoForm } from './todo-form';
import { TodoList } from './todo-list';
import { Todo, TodoDraft, emptyTodoDraft } from './todo-types';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState<TodoDraft>(emptyTodoDraft);

  const handleDraftChange = <Field extends keyof TodoDraft>(
    field: Field,
    value: TodoDraft[Field],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleAddTodo = () => {
    const text = draft.text.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: Date.now(),
      text,
      assignee: draft.assignee.trim(),
      dueDate: draft.dueDate,
      priority: draft.priority,
      category: draft.category.trim(),
      tags: [...draft.tags],
      memo: draft.memo.trim(),
      done: false,
    };

    setTodos((current) => [newTodo, ...current]);
    setDraft(emptyTodoDraft);
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

  const handleUpdate = (id: number, values: TodoDraft) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: values.text.trim(),
              assignee: values.assignee.trim(),
              dueDate: values.dueDate,
              priority: values.priority,
              category: values.category.trim(),
              tags: [...values.tags],
              memo: values.memo.trim(),
            }
          : todo,
      ),
    );
  };

  const remainingCount = todos.filter((todo) => !todo.done).length;

  return (
    <section className="mt-6 max-w-md space-y-6">
      <TodoForm
        idPrefix="new-todo"
        values={draft}
        onChange={handleDraftChange}
        onSubmit={handleAddTodo}
      />

      <div className="space-y-3">
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
        />

        <p className="text-xs text-gray-500">
          {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
        </p>
      </div>
    </section>
  );
}

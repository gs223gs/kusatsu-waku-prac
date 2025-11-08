'use client';

import { useState } from 'react';

import { TodoForm } from './todo-form';
import { TodoList } from './todo-list';
import { assigneeOptions as defaultAssignees, categoryOptions as defaultCategories, tagOptions as defaultTags } from './todo-options';
import { Todo, TodoDraft, emptyTodoDraft } from './todo-types';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState<TodoDraft>(emptyTodoDraft);
  const [assigneeOptions] = useState(defaultAssignees);
  const [categoryOptions] = useState(defaultCategories);
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [newTag, setNewTag] = useState('');

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
        assigneeOptions={assigneeOptions}
        categoryOptions={categoryOptions}
        tagOptions={tagOptions}
      />

      <form
        className="rounded-md border border-dashed border-gray-300 bg-white p-4 text-sm"
        onSubmit={(event) => {
          event.preventDefault();
          const tagLabel = newTag.trim();
          if (!tagLabel) return;
          const exists = tagOptions.some(
            (option) => option.toLowerCase() === tagLabel.toLowerCase(),
          );
          if (!exists) {
            setTagOptions((current) => [...current, tagLabel]);
          }
          setNewTag('');
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Add tag option
        </p>
        <div className="mt-2 flex gap-2">
          <input
            value={newTag}
            onChange={(event) => setNewTag(event.target.value)}
            placeholder="New tag label"
            className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onUpdate={handleUpdate}
          assigneeOptions={assigneeOptions}
          categoryOptions={categoryOptions}
          tagOptions={tagOptions}
        />

        <p className="text-xs text-gray-500">
          {remainingCount} task{remainingCount === 1 ? '' : 's'} remaining
        </p>
      </div>
    </section>
  );
}

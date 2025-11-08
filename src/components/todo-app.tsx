'use client';

import { useState } from 'react';

import { AssigneeOptionForm } from './assignee-option-form';
import { CategoryOptionForm } from './category-option-form';
import { TagOptionForm } from './tag-option-form';
import { TodoForm } from './todo-form';
import { TodoList } from './todo-list';
import {
  assigneeOptions as defaultAssignees,
  categoryOptions as defaultCategories,
  tagOptions as defaultTags,
} from './todo-options';
import { Todo, TodoDraft, emptyTodoDraft } from './todo-types';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState<TodoDraft>(emptyTodoDraft);
  const [assigneeOptions, setAssigneeOptions] = useState(defaultAssignees);
  const [categoryOptions, setCategoryOptions] = useState(defaultCategories);
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [newTag, setNewTag] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newAssignee, setNewAssignee] = useState('');

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
      assignees: [...draft.assignees],
      dueDate: draft.dueDate,
      priority: draft.priority,
      categories: [...draft.categories],
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
              assignees: [...values.assignees],
              dueDate: values.dueDate,
              priority: values.priority,
              categories: [...values.categories],
              tags: [...values.tags],
              memo: values.memo.trim(),
            }
          : todo,
      ),
    );
  };

  const remainingCount = todos.filter((todo) => !todo.done).length;

  const handleAddTagOption = (label: string) => {
    setTagOptions((current) => [...current, label]);
  };

  const handleAddCategoryOption = (label: string) => {
    setCategoryOptions((current) => [...current, label]);
  };

  const handleAddAssigneeOption = (label: string) => {
    setAssigneeOptions((current) => [...current, label]);
  };

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

      <div className="space-y-4">
        <TagOptionForm
          value={newTag}
          options={tagOptions}
          onChange={setNewTag}
          onAdd={handleAddTagOption}
        />

        <CategoryOptionForm
          value={newCategory}
          options={categoryOptions}
          onChange={setNewCategory}
          onAdd={handleAddCategoryOption}
        />

        <AssigneeOptionForm
          value={newAssignee}
          options={assigneeOptions}
          onChange={setNewAssignee}
          onAdd={handleAddAssigneeOption}
        />
      </div>

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

'use client';

import { useState } from 'react';

import { TodoForm } from './todo-form';
import type { Todo, TodoDraft, TodoPriority } from './todo-types';
import { emptyTodoDraft } from './todo-types';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, values: TodoDraft) => void;
};

const priorityStyles: Record<TodoPriority, string> = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  medium: 'border-amber-200 bg-amber-50 text-amber-700',
  high: 'border-rose-200 bg-rose-50 text-rose-700',
};

export function TodoList({ todos, onToggle, onRemove, onUpdate }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<TodoDraft>(emptyTodoDraft);

  if (todos.length === 0) {
    return <p className="text-sm text-gray-500">No tasks yet. Add your first one above.</p>;
  }

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setDraft({
      text: todo.text,
      assignee: todo.assignee,
      dueDate: todo.dueDate,
      priority: todo.priority,
      category: todo.category,
      tags: [...todo.tags],
      memo: todo.memo,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraft(emptyTodoDraft);
  };

  const handleDraftChange = <Field extends keyof TodoDraft>(
    field: Field,
    value: TodoDraft[Field],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    if (editingId === null || !draft.text.trim()) return;
    onUpdate(editingId, draft);
    cancelEditing();
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;
        const priorityClass = priorityStyles[todo.priority];
        const assigneeLabel = todo.assignee ? `Assigned to ${todo.assignee}` : 'Unassigned';
        const dueLabel = todo.dueDate ? `Due ${todo.dueDate}` : 'No due date';
        const categoryLabel = todo.category ? `Category: ${todo.category}` : 'No category';
        const tagList = todo.tags;
        const memoText = todo.memo.trim();

        return (
          <li
            key={todo.id}
            className="rounded-md border border-gray-200 bg-white px-3 py-3 shadow-sm"
          >
            {isEditing ? (
              <TodoForm
                idPrefix={`edit-${todo.id}`}
                values={draft}
                onChange={handleDraftChange}
                onSubmit={handleSave}
                submitLabel="Save changes"
                onCancel={cancelEditing}
                className="border-0 p-0 shadow-none"
              />
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => onToggle(todo.id)}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <span
                      aria-hidden
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                        todo.done ? 'border-black bg-black text-white' : 'border-gray-300'
                      }`}
                    >
                      {todo.done ? '✓' : ''}
                    </span>
                    <div>
                      <p className={todo.done ? 'text-gray-400 line-through' : 'text-gray-900'}>
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-500">
                        {assigneeLabel} · {dueLabel}
                      </p>
                      <p className="text-xs text-gray-500">{categoryLabel}</p>
                      {tagList.length ? (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {tagList.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {memoText ? (
                        <p className="mt-2 rounded-md bg-gray-50 p-2 text-xs text-gray-600">
                          {memoText}
                        </p>
                      ) : null}
                    </div>
                  </button>

                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-medium capitalize ${priorityClass}`}
                  >
                    {todo.priority}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => startEditing(todo)}
                    className="text-gray-500 underline-offset-2 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(todo.id)}
                    className="text-gray-400 transition hover:text-black"
                    aria-label={`Remove ${todo.text}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

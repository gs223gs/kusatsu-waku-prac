'use client';

import { FormEvent } from 'react';

import type { TodoDraft, TodoPriority } from './todo-types';

type TodoFormProps = {
  idPrefix?: string;
  values: TodoDraft;
  onChange: <Field extends keyof TodoDraft>(field: Field, value: TodoDraft[Field]) => void;
  onSubmit: () => void;
  submitLabel?: string;
  onCancel?: () => void;
  className?: string;
};

const priorityLabels: Record<TodoPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TodoForm({
  idPrefix = 'todo',
  values,
  onChange,
  onSubmit,
  submitLabel = 'Add task',
  onCancel,
  className = '',
}: TodoFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const isDisabled = !values.text.trim();

  const formClassName = `space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm ${className}`;

  const inputClasses =
    'w-full rounded border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-wide" htmlFor={`${idPrefix}-text`}>
          Task
        </label>
        <input
          id={`${idPrefix}-text`}
          value={values.text}
          onChange={(event) => onChange('text', event.target.value)}
          placeholder="Write a task"
          className={inputClasses}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase tracking-wide" htmlFor={`${idPrefix}-assignee`}>
            Assignee
          </label>
          <input
            id={`${idPrefix}-assignee`}
            value={values.assignee}
            onChange={(event) => onChange('assignee', event.target.value)}
            placeholder="Name (optional)"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium uppercase tracking-wide" htmlFor={`${idPrefix}-dueDate`}>
            Due date
          </label>
          <input
            id={`${idPrefix}-dueDate`}
            type="date"
            value={values.dueDate}
            onChange={(event) => onChange('dueDate', event.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-wide" htmlFor={`${idPrefix}-priority`}>
          Priority
        </label>
        <select
          id={`${idPrefix}-priority`}
          value={values.priority}
          onChange={(event) => onChange('priority', event.target.value as TodoDraft['priority'])}
          className={inputClasses}
        >
          {Object.keys(priorityLabels).map((priority) => (
            <option key={priority} value={priority}>
              {priorityLabels[priority as TodoPriority]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

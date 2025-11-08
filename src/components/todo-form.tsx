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
  assignOptions: string[];
  categoryOptions: string[];
  tagOptions: string[];
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
  assignOptions,
  categoryOptions,
  tagOptions,
}: TodoFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const isDisabled = !values.text.trim();

  const formClassName = `space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm ${className}`;

  const inputClasses =
    'w-full rounded border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none';

  const toggleButtonClass = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs font-medium transition ${
      active
        ? 'border-black bg-black text-white'
        : 'border-gray-200 text-gray-600 hover:border-gray-400'
    }`;

  const handleassignToggle = (assign: string) => {
    const isSelected = values.assigns.includes(assign);
    const nextassigns = isSelected
      ? values.assigns.filter((current) => current !== assign)
      : [...values.assigns, assign];
    onChange('assigns', nextassigns);
  };

  const handleTagToggle = (tag: string) => {
    const isSelected = values.tags.includes(tag);
    const nextTags = isSelected
      ? values.tags.filter((current) => current !== tag)
      : [...values.tags, tag];
    onChange('tags', nextTags);
  };

  const handleCategoryToggle = (category: string) => {
    const isSelected = values.categories.includes(category);
    const nextCategories = isSelected
      ? values.categories.filter((current) => current !== category)
      : [...values.categories, category];
    onChange('categories', nextCategories);
  };

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
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wide">assigns</label>
            {values.assigns.length ? (
              <button
                type="button"
                onClick={() => onChange('assigns', [])}
                className="text-[10px] uppercase tracking-wide text-gray-400"
              >
                Clear
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {assignOptions.map((option) => {
              const isSelected = values.assigns.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleassignToggle(option)}
                  className={toggleButtonClass(isSelected)}
                >
                  {option}
                </button>
              );
            })}
          </div>
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

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wide">Categories</label>
            {values.categories.length ? (
              <button
                type="button"
                onClick={() => onChange('categories', [])}
                className="text-[10px] uppercase tracking-wide text-gray-400"
              >
                Clear
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => {
              const isSelected = values.categories.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => handleCategoryToggle(option)}
                  className={toggleButtonClass(isSelected)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-wide">Tags</label>
            {values.tags.length ? (
              <button
                type="button"
                onClick={() => onChange('tags', [])}
                className="text-[10px] uppercase tracking-wide text-gray-400"
              >
                Clear
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => {
              const isSelected = values.tags.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={toggleButtonClass(isSelected)}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium uppercase tracking-wide" htmlFor={`${idPrefix}-memo`}>
          Memo
        </label>
        <textarea
          id={`${idPrefix}-memo`}
          value={values.memo}
          onChange={(event) => onChange('memo', event.target.value)}
          placeholder="Additional context"
          className={`${inputClasses} min-h-24`}
        />
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

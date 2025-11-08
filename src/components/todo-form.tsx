'use client';

import { FormEvent } from 'react';

type TodoFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function TodoForm({ value, onChange, onSubmit }: TodoFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 rounded-md border border-gray-200 bg-white p-3 shadow-sm"
    >
      <label className="sr-only" htmlFor="todo-input">
        Add a new task
      </label>
      <input
        id="todo-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buy milk"
        className="flex-1 rounded border border-gray-200 px-3 py-2 text-base focus:border-black focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        disabled={!value.trim()}
      >
        Add
      </button>
    </form>
  );
}

'use client';

import { FormEvent } from 'react';

type CategoryOptionFormProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onAdd: (label: string) => void;
};

export function CategoryOptionForm({
  value,
  options,
  onChange,
  onAdd,
}: CategoryOptionFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = value.trim();
    if (!label) return;
    const exists = options.some((option) => option.toLowerCase() === label.toLowerCase());
    if (exists) return;
    onAdd(label);
    onChange('');
  };

  return (
    <form
      className="rounded-md border border-dashed border-gray-300 bg-white p-4 text-sm"
      onSubmit={handleSubmit}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">カテゴリ候補の追加</p>
      <div className="mt-2 flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="新しいカテゴリ名"
          className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium"
        >
          追加
        </button>
      </div>
    </form>
  );
}

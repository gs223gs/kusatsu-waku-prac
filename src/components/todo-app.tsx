'use client';

import { useState } from 'react';

import { AssignOptionForm } from './assignee-option-form'; 
import { CategoryOptionForm } from './category-option-form';
import { TagOptionForm } from './tag-option-form';
import { TodoForm } from './todo-form';
import { TodoList } from './todo-list';
import {
  assignOptions as defaultassigns,
  categoryOptions as defaultCategories,
  tagOptions as defaultTags,
} from './todo-options';
import { Todo, TodoDraft, emptyTodoDraft } from './todo-types';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState<TodoDraft>(emptyTodoDraft);
  const [assignOptions, setassignOptions] = useState(defaultassigns);
  const [categoryOptions, setCategoryOptions] = useState(defaultCategories);
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [newTag, setNewTag] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newassign, setNewassign] = useState('');

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
      assigns: [...draft.assigns],
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
              assigns: [...values.assigns],
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
  const totalCount = todos.length;
  const completedCount = totalCount - remainingCount;

  const stats = [
    { label: '未完了タスク', value: remainingCount },
    { label: '完了済み', value: completedCount },
    { label: 'カテゴリ', value: categoryOptions.length },
    { label: 'タグ', value: tagOptions.length },
    { label: 'メンバー', value: assignOptions.length },
  ];

  const priorityBreakdown = ['high', 'medium', 'low'].map((priority) => ({
    priority,
    count: todos.filter((todo) => todo.priority === priority).length,
  }));

  const upcomingTodos = todos
    .filter((todo) => !todo.done && todo.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  const handleAddTagOption = (label: string) => {
    setTagOptions((current) => [...current, label]);
  };

  const handleAddCategoryOption = (label: string) => {
    setCategoryOptions((current) => [...current, label]);
  };

  const handleAddassignOption = (label: string) => {
    setassignOptions((current) => [...current, label]);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2.2fr,1fr]" id="pipeline">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">新規タスク</p>
                <h2 className="text-xl font-semibold text-slate-900">Create a task</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Draft mode</span>
            </div>
            <TodoForm
              idPrefix="new-todo"
              values={draft}
              onChange={handleDraftChange}
              onSubmit={handleAddTodo}
              assignOptions={assignOptions}
              categoryOptions={categoryOptions}
              tagOptions={tagOptions}
            />
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm" id="backlog">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">タスクリスト</p>
                <h2 className="text-xl font-semibold text-slate-900">Pipeline</h2>
              </div>
              <span className="text-xs text-slate-500">{remainingCount} 件の未完了</span>
            </div>
            <div className="max-h-[520px] overflow-y-auto pr-2">
              <TodoList
                todos={todos}
                onToggle={handleToggle}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                assignOptions={assignOptions}
                categoryOptions={categoryOptions}
                tagOptions={tagOptions}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6" id="resources">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">優先度サマリ</p>
            <h2 className="text-xl font-semibold text-slate-900">Priority view</h2>
            <ul className="mt-4 space-y-3">
              {priorityBreakdown.map((item) => (
                <li key={item.priority} className="flex items-center justify-between text-sm text-slate-600">
                  <span className="capitalize">{item.priority}</span>
                  <span className="text-slate-900">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">スケジュール</p>
            <h2 className="text-xl font-semibold text-slate-900">Upcoming</h2>
            {upcomingTodos.length ? (
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {upcomingTodos.map((todo) => (
                  <li key={todo.id} className="rounded-2xl border border-slate-100 px-4 py-3">
                    <p className="font-medium text-slate-900">{todo.text}</p>
                    <p className="text-xs text-slate-500">Due {todo.dueDate}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">期限付きのタスクはまだありません。</p>
            )}
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">リソース管理</p>
              <h2 className="text-xl font-semibold text-slate-900">Workspace Catalog</h2>
              <p className="text-sm text-slate-500">ルーティングが変わっても同じ候補リストを共有できます。</p>
            </div>

            <TagOptionForm value={newTag} options={tagOptions} onChange={setNewTag} onAdd={handleAddTagOption} />

            <CategoryOptionForm
              value={newCategory}
              options={categoryOptions}
              onChange={setNewCategory}
              onAdd={handleAddCategoryOption}
            />

            <AssignOptionForm
              value={newassign}
              options={assignOptions}
              onChange={setNewassign}
              onAdd={handleAddassignOption}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

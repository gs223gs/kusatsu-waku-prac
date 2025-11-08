export type TodoPriority = 'low' | 'medium' | 'high';

export type TodoDraft = {
  text: string;
  assigns: string[];
  dueDate: string;
  priority: TodoPriority;
  categories: string[];
  tags: string[];
  memo: string;
};

export type Todo = TodoDraft & {
  id: number;
  done: boolean;
};

export const emptyTodoDraft: TodoDraft = {
  text: '',
  assigns: [],
  dueDate: '',
  priority: 'medium',
  categories: [],
  tags: [],
  memo: '',
};

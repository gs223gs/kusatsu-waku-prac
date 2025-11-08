export type TodoPriority = 'low' | 'medium' | 'high';

export type TodoDraft = {
  text: string;
  assignees: string[];
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
  assignees: [],
  dueDate: '',
  priority: 'medium',
  categories: [],
  tags: [],
  memo: '',
};

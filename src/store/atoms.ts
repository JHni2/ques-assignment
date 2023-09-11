import { TodoType } from '@/components/TodoList';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type TodoSortType = {
  feild: 'createdAt' | 'title' | 'check';
  order: 'asc' | 'des';
};

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-states',
  storage: localStorage,
});

export const todoListState = atom({
  key: 'todos',
  default: [] as TodoType[],
  effects_UNSTABLE: [persistAtom],
});

export const currentTodoState = atom({
  key: 'currentTodo',
  default: {} as TodoType,
  effects_UNSTABLE: [persistAtom],
});

export const todoSortState = atom({
  key: 'todoSort',
  default: {} as TodoSortType,
  effects_UNSTABLE: [persistAtom],
});

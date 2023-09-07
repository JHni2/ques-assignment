import { TodoType } from '@/components/TodoList';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

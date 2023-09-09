'use client';
import { useRecoilState } from 'recoil';
import { currentTodoState, todoListState } from '@/store/atoms';
import { useEffect, useState } from 'react';
import { TodoType } from '@/components/TodoList';

const defaultValue = { id: 1, task: '', checked: false, date: '', memo: '' };

export function useTodos() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState<TodoType[]>(todoListState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? [defaultValue] : value, setValue] as const;
}

export function useCurrentTodo() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState<TodoType>(currentTodoState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}

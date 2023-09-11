'use client';
import { useRecoilState } from 'recoil';
import { currentTodoState, todoListState, todoSortState } from '@/store/atoms';
import { useEffect, useState } from 'react';
import { TodoType } from '@/components/TodoList';
import { defualtImage } from '@/components/DetailImage';

const defaultTodoValue = { id: 1, task: '', checked: false, date: null, memo: '', img: defualtImage, createdAt: new Date() };
const defaultSortValue = { field: '', order: '' };

export function useTodos() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState<TodoType[]>(todoListState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? [defaultTodoValue] : value, setValue] as const;
}

export function useCurrentTodo() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState<TodoType>(currentTodoState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultTodoValue : value, setValue] as const;
}

export function useStorageSort() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(todoSortState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultSortValue : value, setValue] as const;
}

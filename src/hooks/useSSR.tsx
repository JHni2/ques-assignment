'use client';
import { useRecoilState } from 'recoil';
import { todoListState } from '@/store/atoms';
import { useEffect, useState } from 'react';

const defaultValue = [{ id: 1 }];

export function useSSR() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(todoListState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}

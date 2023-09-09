'use client';
import { useCurrentTodo, useTodos } from '@/hooks/useSSR';
import { useCallback, useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/debounce';
import { TodoType } from './TodoList';
import { saveTodos } from '@/store/todoStorage';
import { convertTime } from '@/utils/convertTime';
import TextareaAutosize from 'react-textarea-autosize';

export default function DetailMemo() {
  const [currentTodo, setCurrentTodo] = useCurrentTodo();
  const [todos, setTodos] = useTodos();
  const [memo, setMemo] = useState('');
  const debouncedMemo = useDebounce(memo);

  useEffect(() => {
    currentTodo.memo && setMemo(currentTodo.memo);
  }, [currentTodo.memo]);

  useEffect(() => {
    const newTodos = todos.map((todo: TodoType) => {
      if (todo.id === Number(currentTodo.id)) {
        return {
          ...todo,
          memo: debouncedMemo,
        };
      }
      return todo;
    });

    if (newTodos[0].id !== 1) {
      saveTodos(newTodos);
      setTodos(newTodos);
    }
  }, [debouncedMemo]);

  return (
    <div className="flex flex-col gap-1 px-8 py-4">
      <p className="text-lg font-bold">메모</p>
      {currentTodo && (
        <>
          <TextareaAutosize placeholder="메모 설정" value={memo} onChange={(e) => setMemo(e.target.value)}></TextareaAutosize>
          <p className="pt-8 text-end text-sm text-blue-900/60">{convertTime(currentTodo?.createdAt)} 생성함</p>
        </>
      )}
    </div>
  );
}

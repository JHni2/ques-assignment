'use client';
import { useCurrentTodo } from '@/hooks/useSSR';
import { loadCurrentTodo } from '@/store/todoStorage';
import { useEffect, useRef, useState } from 'react';
import { Value } from './CalendarDetail';
import TodoInput from './TodoInput';
import TodoListBox from './TodoListBox';
import ScrollToInput from './ui/icons/ScrollToInput';

export type TodoType = {
  id: number;
  task: string;
  checked: boolean;
  date: Value;
  memo: string | undefined;
  createdAt: Date;
};

export default function TodoList() {
  const [showAddBtn, setShowAddBtn] = useState(true);
  const todoInputRef = useRef(null);
  const [currentTodo, setCurrentTodo] = useCurrentTodo();

  useEffect(() => {
    loadCurrentTodo();
    localStorage.removeItem('currentTodo');
  }, []);

  useEffect(() => {
    if (!todoInputRef.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowAddBtn(false);
        } else {
          setShowAddBtn(true);
        }
      });
    };

    const options = { root: null, rootMargin: '0px', threshold: 0 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(todoInputRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="todo-list">
      <div className="flex flex-col items-center mb-4">
        <span className="text-sm font-semibold text-blue-900">Todo List</span>
        <span className="text-lg font-bold">할 일 목록</span>
      </div>
      <div className="flex flex-col justify-center">
        <div className="px-8 py-4 rounded-3xl shadow-md mb-6">
          <TodoListBox />
        </div>
        <div ref={todoInputRef}>
          <TodoInput />
        </div>
      </div>
      {showAddBtn && <ScrollToInput />}
    </section>
  );
}

'use client';
import { loadCurrentTodo } from '@/store/todoStorage';
import { useEffect, useRef, useState } from 'react';
import { Value } from './CalendarDetail';
import SortDetail from './SortDetail';
import SortModal from './SortModal';
import Title from './Title';
import TodoInput from './TodoInput';
import TodoListBox from './TodoListBox';
import DotsIcon from './ui/icons/DotsIcon';
import ModalPortal from './ui/icons/ModalPortal';
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
  const [showSortModal, setShowSortModal] = useState(false);
  const todoInputRef = useRef(null);

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
      <div className="relative">
        <Title en="Todo List" kr="할 일 목록" />
        <div onClick={() => setShowSortModal(true)}>
          <DotsIcon className="absolute top-[20px] right-[calc(50%-4.5rem)]" />
          {/* {showSortModal && <SortDetail onClose={() => setShowSortModal(false)} />} */}
        </div>
        {showSortModal && (
          <ModalPortal>
            <SortModal onClose={() => setShowSortModal(false)}>
              <SortDetail />
            </SortModal>
          </ModalPortal>
        )}
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

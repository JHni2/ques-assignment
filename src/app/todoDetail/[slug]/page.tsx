'use client';
import DetailContent from '@/components/DetailContent';
import DetailPhoto from '@/components/DetailPhoto';
import DetailTodo from '@/components/DetailTodo';
import { TodoType } from '@/components/TodoList';
import { useCurrentTodo, useTodos } from '@/hooks/useSSR';
import { saveCurrentTodo } from '@/store/todoStorage';
import { useEffect } from 'react';
import DetailHeader from '../../../components/DetailHeader';

type Props = {
  params: {
    slug: number;
  };
};

export default function TodoDetailPage({ params: { slug } }: Props) {
  const [todos, setTodos] = useTodos();
  const [currentTodo, setCurrentTodo] = useCurrentTodo();
  const newCurrentTodo = todos.find((todo: TodoType) => todo.id === Number(slug));

  useEffect(() => {
    if (newCurrentTodo) {
      saveCurrentTodo(newCurrentTodo);
      setCurrentTodo(newCurrentTodo);
    }
  }, [newCurrentTodo]);

  return (
    <div>
      <DetailHeader />
      <main className="w-full max-w-[1024px] mx-auto px-8 py-4 flex flex-col gap-6 relative top-[100px]">
        <DetailTodo />
        <DetailContent />
        <DetailPhoto />
      </main>
    </div>
  );
}

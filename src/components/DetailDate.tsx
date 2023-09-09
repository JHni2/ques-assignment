'use client';
import { useCurrentTodo } from '@/hooks/useSSR';

export default function DetailDate() {
  const [currentTodo, setCurrentTodo] = useCurrentTodo();

  return (
    <div className="flex flex-col gap-1 px-8 py-4">
      <p className="text-lg font-bold">기한</p>
      {currentTodo && currentTodo.date !== '' ? <span>{currentTodo.date}까지</span> : <span className="opacity-50 cursor-pointer">기한 설정</span>}
    </div>
  );
}

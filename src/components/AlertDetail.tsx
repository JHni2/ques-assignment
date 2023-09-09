'use client';
import { useSSR } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { usePathname, useRouter } from 'next/navigation';
import { TodoType } from './TodoList';

type Props = {
  onClose: () => void;
};

export default function AlertDetail({ onClose }: Props) {
  const [todos, setTodos] = useSSR();
  const id = Number(usePathname().slice(12));
  const router = useRouter();

  const handleDelteTodo = (id: number) => {
    const newTodos = todos.filter((todo: TodoType) => {
      return todo.id !== id;
    });

    saveTodos(newTodos);
    setTodos(newTodos);

    router.push('/');
  };

  return (
    <div className="flex flex-col px-4 py-5">
      <span className="text-lg font-bold mb-2">작업 삭제</span>
      <span>작업이 영구적으로 삭제됩니다.</span>
      <div className="flex justify-center gap-4 mt-5 text-white font-bold">
        <p onClick={() => handleDelteTodo(id)} className="w-full text-center bg-blue-900 px-2 py-2 rounded-lg cursor-pointer">
          삭제
        </p>
        <p onClick={() => onClose()} className="w-full text-center bg-gray-500 px-2 py-2 rounded-lg cursor-pointer">
          취소
        </p>
      </div>
    </div>
  );
}

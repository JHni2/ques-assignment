import { sorts } from '@/const/sort';
import { useTodos } from '@/hooks/useSSR';
import { useEffect, useState } from 'react';
import CheckIcon from './ui/icons/CheckIcon';

export default function SortDetail() {
  const [todos, setTodos] = useTodos();
  const [sortField, setSortField] = useState<'createdAt' | 'title' | 'check'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'des'>('asc');

  useEffect(() => {
    if (todos[0].id !== 1) {
      // setTodos(sortTodos(sortField, sortOrder));
      console.log(sortTodos(sortField, sortOrder));
    }
  }, [sortField, sortOrder]);

  const sortTodos = (field: string, order: string) => {
    if (field === 'createdAt') {
      const dateObjects = todos.map((todo) => new Date(todo.createdAt));
      if (order === 'asc') {
        const ascendingOrder = dateObjects.slice().sort((a, b) => +a - +b);
        const ascendingTimestamps = ascendingOrder.map((date) => date.toISOString());
        const todosAscending = todos.slice().sort((a, b) => ascendingTimestamps.indexOf(a.createdAt.toLocaleString()) - ascendingTimestamps.indexOf(b.createdAt.toLocaleString()));
        return todosAscending;
      } else {
        const descendingOrder = dateObjects.slice().sort((a, b) => +b - +a);
        const descendingTimestamps = descendingOrder.map((date) => date.toISOString());
        const todosDescending = todos.slice().sort((a, b) => descendingTimestamps.indexOf(a.createdAt.toLocaleString()) - descendingTimestamps.indexOf(b.createdAt.toLocaleString()));
        return todosDescending;
      }
    } else if (field === 'title') {
      const dateObjects = todos.map((todo) => todo.task);
      if (order === 'asc') {
        const ascendingOrder = dateObjects.slice().sort();
        const todosAscending = todos.slice().sort((a, b) => {
          const taskA: string = a.task.toLowerCase();
          const taskB: string = b.task.toLowerCase();
          return ascendingOrder.indexOf(taskA) - ascendingOrder.indexOf(taskB);
        });
        return todosAscending;
      } else {
        const descendingOrder = dateObjects.slice().sort().reverse();
        const todosDescending = todos.slice().sort((a, b) => {
          const taskA: string = a.task.toLowerCase();
          const taskB: string = b.task.toLowerCase();
          return descendingOrder.indexOf(taskA) - descendingOrder.indexOf(taskB);
        });
        return todosDescending;
      }
    } else if (field === 'check') {
      if (order === 'asc') {
        const todosAscending = todos.slice().sort((a, b) => {
          return +a.checked - +b.checked;
        });
        return todosAscending;
      } else {
        const todosDescending = todos.slice().sort((a, b) => {
          return +b.checked - +a.checked;
        });
        return todosDescending;
      }
    }
    return todos;
  };

  return (
    <div className="absolute bottom-[2rem] right-[calc(50%-12rem)] px-7 py-3 shadow-md rounded-3xl bg-white z-50">
      <span className="text-sm font-bold">정렬</span>
      <div className="flex flex-col gap-2 text-sm mt-2">
        <div onClick={() => setSortField('createdAt')} className="flex gap-2 items-center cursor-pointer">
          {sortField === 'createdAt' && <CheckIcon />} <span>생성일</span>
        </div>
        <div onClick={() => setSortField('title')} className="flex gap-2 items-center cursor-pointer">
          {sortField === 'title' && <CheckIcon />}
          <span> 제목</span>
        </div>
        <div onClick={() => setSortField('check')} className="flex gap-2 items-center cursor-pointer">
          {sortField === 'check' && <CheckIcon />} <span>체크</span>
        </div>
        <div onClick={() => setSortOrder('asc')} className="flex gap-2 items-center cursor-pointer">
          {sortOrder === 'asc' && <CheckIcon />} <span>오름차순</span>
        </div>
        <div onClick={() => setSortOrder('des')} className="flex gap-2 items-center cursor-pointer">
          {sortOrder === 'des' && <CheckIcon />} <span>내림차순</span>
        </div>
      </div>
    </div>
  );
}

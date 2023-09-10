import { useTodos } from '@/hooks/useSSR';
import { useEffect, useState } from 'react';
import SortOption from './SortOption';

export default function SortDetail() {
  const [todos, setTodos] = useTodos();
  const [sortField, setSortField] = useState<'createdAt' | 'title' | 'check'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'des'>('asc');

  useEffect(() => {
    if (todos[0].id !== 1) {
      setTodos(sortTodos(sortField, sortOrder));
    }
  }, [sortField, sortOrder]);

  const sortTodos = (field: string, order: string) => {
    return [...todos].sort((a, b) => {
      switch (field) {
        case 'createdAt':
          const timestampA: number = new Date(a.createdAt).getTime();
          const timestampB: number = new Date(b.createdAt).getTime();
          return order === 'asc' ? timestampA - timestampB : timestampB - timestampA;

        case 'title':
          const titleA: string = a.task.toLowerCase();
          const titleB: string = b.task.toLowerCase();
          return order === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);

        case 'check':
          return order === 'asc' ? +a.checked - +b.checked : +b.checked - +a.checked;

        default:
          return 0;
      }
    });
  };

  return (
    <div className="flex flex-col items-center absolute top-[29rem] right-[calc(50%-12rem)] py-3 shadow-md rounded-3xl bg-white z-50">
      <span className="text-sm font-bold px-7">정렬</span>
      <div className="flex flex-col gap-2 text-sm mt-2">
        <SortOption fieldKr={'생성일'} fieldEn={'createdAt'} sortField={sortField} setSortField={setSortField} />
        <SortOption fieldKr={'제목'} fieldEn={'title'} sortField={sortField} setSortField={setSortField} />
        <SortOption fieldKr={'체크'} fieldEn={'check'} sortField={sortField} setSortField={setSortField} />
        <div className="border-b-[3px] opacity-50" />
        <SortOption orderKr={'오름차순'} orderEn={'asc'} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        <SortOption orderKr={'내림차순'} orderEn={'des'} sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
    </div>
  );
}

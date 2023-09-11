import { useStorageSort, useTodos } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { useEffect, useState } from 'react';
import SortOption from './SortOption';

export default function SortDetail() {
  const [todos, setTodos] = useTodos();
  const [storageSort, setStorageSort] = useStorageSort();
  const [sortField, setSortField] = useState<'createdAt' | 'title' | 'check' | ''>(storageSort.field);
  const [sortOrder, setSortOrder] = useState<'asc' | 'des' | ''>(storageSort.order);

  // useEffect(() => {
  //   if (storageSort.field === '' && storageSort.order === '') {
  //     return;
  //   } else {
  //     if (storageSort.field === undefined && storageSort.order === undefined) {
  //       setStorageSort({ field: 'createdAt', order: 'asc' });
  //     }
  //   }
  // }, [storageSort]);

  useEffect(() => {
    if (storageSort.field === '' && storageSort.order === '') {
      return;
    } else {
      if (storageSort.field === undefined && storageSort.order === undefined) {
        setStorageSort({ field: 'createdAt', order: 'asc' });
      }
    }

    if (todos[0]) {
      if (todos[0].id !== 1) {
        const newTodos = sortTodos(storageSort.field, sortOrder);
        if (sortField === '' && sortOrder === '') {
          return;
        }
        setTodos(newTodos);
        saveTodos(newTodos);
      }
    }
  }, [sortField, sortOrder, storageSort]);

  useEffect(() => {
    if (sortField === '') {
      return;
    } else {
      setStorageSort({ field: sortField, order: storageSort.order });
    }
  }, [sortField]);

  useEffect(() => {
    if (sortOrder === '') {
      return;
    } else {
      setStorageSort({ field: storageSort.field, order: sortOrder });
    }
  }, [sortOrder]);

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

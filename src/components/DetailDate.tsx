'use client';
import { week } from '@/const/week';
import { useCurrentTodo } from '@/hooks/useSSR';
import { useEffect, useState } from 'react';
import CalendarDetail, { Value } from './CalendarDetail';
import CalendarModal from './CalendarModal';
import ModalPortal from './ui/icons/ModalPortal';

export default function DetailDate() {
  const [currentTodo, setCurrentTodo] = useCurrentTodo();
  const [todoDate, setTodoDate] = useState<null | string>(null);
  const [date, setDate] = useState<Value>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (currentTodo.date === null || currentTodo.date === undefined) {
      setTodoDate(null);
    } else {
      {
        const currentTodoDate = new Date(currentTodo.date.toString());
        const year = currentTodoDate.getFullYear();
        const month = currentTodoDate.getMonth();
        const date = currentTodoDate.getDate();
        const day = currentTodoDate.getDay();

        setTodoDate(`${year}년 ${month}월 ${date}일 ${week[day]}`);
      }
    }
  }, [currentTodo, currentTodo.date]);

  return (
    <div className="flex flex-col gap-1 px-8 py-4">
      <p className="text-lg font-bold">기한</p>
      <div onClick={() => setOpenModal(true)}>{currentTodo && todoDate !== null ? <span className="cursor-pointer">{todoDate}까지</span> : <span className="text-blue-900/60 cursor-pointer">기한 설정</span>}</div>
      {openModal && (
        <ModalPortal>
          <CalendarModal onClose={() => setOpenModal(false)}>
            <CalendarDetail id={currentTodo.id} setDate={setDate} onClose={() => setOpenModal(false)} />
          </CalendarModal>
        </ModalPortal>
      )}
    </div>
  );
}

import { useTodos } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { TodoType } from './TodoList';

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  onClose: () => void;
  setDate: (date: Value) => void;
  id?: number;
};

export default function CalendarDetail({ onClose, setDate, id }: Props) {
  const [todos, setTodos] = useTodos();
  const [value, onChange] = useState<Value>(new Date());

  const handleAddDate = (id: number) => {
    const newTodos = todos.map((todo: TodoType) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          date: value,
        };
      }
      return todo;
    });

    saveTodos(newTodos);
    setTodos(newTodos);
  };

  const handleDateTodo = () => {
    if (handleAddDate && id) {
      handleAddDate(id);
    }
    setDate(value);
    onClose();
  };

  return (
    <>
      <Calendar onChange={onChange} value={value} formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })} />
      <div className="flex justify-center gap-4 text-white font-bold p-2 pt-0">
        <p onClick={() => handleDateTodo()} className="w-full text-center bg-blue-900 px-2 py-2 rounded-lg cursor-pointer">
          저장
        </p>
        <p onClick={() => onClose()} className="w-full text-center bg-gray-500 px-2 py-2 rounded-lg cursor-pointer">
          취소
        </p>
      </div>
    </>
  );
}

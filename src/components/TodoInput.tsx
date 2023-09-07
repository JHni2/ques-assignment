import { ChangeEvent } from 'react';
import CalendarIcon from './ui/icons/CalendarIcon';

type TodoInputProps = {
  task: string;
  onTaskChange: (task: string) => void;
  onSubmit: () => void;
};

export default function TodoInput({ task, onTaskChange: onTaskChange, onSubmit }: TodoInputProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTaskChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form id="todo-input" className="flex justify-between px-6 py-2.5 bg-white border-blue-900 border-2 rounded-3xl mb-3 " onSubmit={handleSubmit}>
      <input className="outline-none" placeholder="+ 할 일 추가" value={task} onChange={handleInputChange} />
      <CalendarIcon />
    </form>
  );
}

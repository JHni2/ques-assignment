import { ChangeEvent } from 'react';
import CalendarIcon from './ui/icons/CalendarIcon';

type TodoInputProps = {
  title: string;
  onTitleChange: (title: string) => void;
  onSubmit: () => void;
};

export default function TodoInput({ title, onTitleChange, onSubmit }: TodoInputProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form id="todo-input" className="flex justify-between px-6 py-2.5 bg-white border-blue-900 border-2 rounded-3xl mb-3 " onSubmit={handleSubmit}>
      <input className="outline-none" placeholder="+ 할 일 추가" value={title} onChange={handleInputChange} />
      <CalendarIcon />
    </form>
  );
}

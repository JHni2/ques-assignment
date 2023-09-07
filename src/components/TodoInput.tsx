import { useSSR } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { ChangeEvent, useEffect, useState } from 'react';
import CalendarIcon from './ui/icons/CalendarIcon';

export default function TodoInput() {
  const [todos, setTodos] = useSSR();
  const [task, setTask] = useState('');

  const handleTaskChange = (text: string) => {
    setTask(text);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleTaskChange(event.target.value);
  };

  const addTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (task === '') return;
    const newTodos = todos.concat({
      id: Date.now(),
      task: task,
      checked: false,
      date: '',
      memo: '',
    });

    saveTodos(newTodos);
    setTodos(newTodos);
    setTask('');
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [task]);

  return (
    <form id="todo-input" className="flex justify-between px-6 py-2.5 bg-white border-blue-900 border-2 rounded-3xl mb-3 " onSubmit={addTask}>
      <input className="w-full outline-none" placeholder="+ 할 일 추가" value={task} onChange={handleInputChange} />
      <CalendarIcon />
    </form>
  );
}

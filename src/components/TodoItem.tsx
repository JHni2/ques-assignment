'use client';
import { useTodos } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import Link from 'next/link';
import { TodoType } from './TodoList';
import CheckBoxCheckedIcon from './ui/icons/CheckBoxIcon';
import UncheckedBoxIcon from './ui/icons/UncheckedBoxIcon';

type Props = {
  id: number;
  task: string;
  checked: boolean;
};

export default function TodoItem({ id, task, checked }: Props) {
  const [todos, setTodos] = useTodos();

  const toggleTodoList = (id: number) => {
    const newTodos = todos.map((todo: TodoType) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      }
      return todo;
    });

    saveTodos(newTodos);
    setTodos(newTodos);
  };

  return (
    <li className="flex items-center gap-4 mb-4">
      {task && (
        <>
          <div onClick={() => toggleTodoList(id)}>{checked ? <CheckBoxCheckedIcon /> : <UncheckedBoxIcon />}</div>
          <span className="text-lg">
            <Link href={`/todoDetail/${id}`}>{task}</Link>
          </span>
        </>
      )}
    </li>
  );
}

'use client';
import { useSSR } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { TodoType } from './TodoList';
import CheckBoxCheckedIcon from './ui/icons/CheckBoxIcon';
import UncheckedBoxIcon from './ui/icons/UncheckedBoxIcon';

export default function TodoItem({ id, task, checked, date, memo }: TodoType) {
  const [todos, setTodos] = useSSR();

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
      <div onClick={() => toggleTodoList(id)}>{checked ? <CheckBoxCheckedIcon /> : <UncheckedBoxIcon />}</div>
      <span className="text-lg">{task}</span>
    </li>
  );
}

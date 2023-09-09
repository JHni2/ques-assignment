'use client';
import { useSSR } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { TodoType } from './TodoList';
import CheckBoxCheckedIcon from './ui/icons/CheckBoxIcon';
import UncheckedBoxIcon from './ui/icons/UncheckedBoxIcon';

type Props = {
  id: number;
};

export default function DetailTodo({ id }: Props) {
  const [todos, setTodos] = useSSR();
  const currentTodo = todos.find((todo: TodoType) => todo.id === Number(id));

  const toggleTodoList = (id: number) => {
    const newTodos = todos.map((todo: TodoType) => {
      if (todo.id === Number(id)) {
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
    <div className="relative top-[110px]">
      {currentTodo && (
        <div className="flex items-center gap-4 px-3 py-5 mx-3 border-[3px] border-blue-900 rounded-3xl">
          <div onClick={() => toggleTodoList(id)}>{currentTodo.checked ? <CheckBoxCheckedIcon /> : <UncheckedBoxIcon />}</div>
          <span className="text-lg font-bold">{currentTodo.task}</span>
        </div>
      )}
    </div>
  );
}

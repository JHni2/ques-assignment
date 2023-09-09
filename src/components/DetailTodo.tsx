'use client';
import { useCurrentTodo, useTodos } from '@/hooks/useSSR';
import { saveCurrentTodo, saveTodos } from '@/store/todoStorage';
import { useEffect } from 'react';
import { TodoType } from './TodoList';
import CheckBoxCheckedIcon from './ui/icons/CheckBoxIcon';
import UncheckedBoxIcon from './ui/icons/UncheckedBoxIcon';

export default function DetailTodo() {
  const [todos, setTodos] = useTodos();
  const [currentTodo, setCurrentTodo] = useCurrentTodo();
  // const newCurrentTodo = todos.find((todo: TodoType) => todo.id === Number(currentTodo.id ?? 0));

  // useEffect(() => {
  //   saveCurrentTodo(newCurrentTodo);
  //   setCurrentTodo(newCurrentTodo);
  // }, [newCurrentTodo]);

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
    <>
      {currentTodo && (
        <div className="flex items-center gap-4 px-3 py-5 border-[3px] border-blue-900 rounded-3xl">
          <div onClick={() => toggleTodoList(currentTodo.id)}>{currentTodo.checked ? <CheckBoxCheckedIcon /> : <UncheckedBoxIcon />}</div>
          <span className="text-lg font-bold">{currentTodo.task}</span>
        </div>
      )}
    </>
  );
}

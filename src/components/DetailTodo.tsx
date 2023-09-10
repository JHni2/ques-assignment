'use client';
import useDebounce from '@/hooks/useDebounce';
import { useCurrentTodo, useTodos } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import { ChangeEvent, useEffect, useState } from 'react';
import { TodoType } from './TodoList';
import CheckBoxCheckedIcon from './ui/icons/CheckBoxIcon';
import UncheckedBoxIcon from './ui/icons/UncheckedBoxIcon';

export default function DetailTodo() {
  const [todos, setTodos] = useTodos();
  const [currentTodo, setCurrentTodo] = useCurrentTodo();
  const [task, setTask] = useState(currentTodo.task);
  const debouncedTask = useDebounce(task);

  const handleTaskChange = (text: string) => {
    setTask(text);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleTaskChange(event.target.value);
  };

  useEffect(() => {
    if (currentTodo.id !== 1) {
      setTask(currentTodo.task);
    }
  }, [currentTodo.task]);

  useEffect(() => {
    if (currentTodo.id !== 1) {
      const newTodos = todos.map((todo: TodoType) => {
        if (todo.id === Number(currentTodo.id)) {
          return {
            ...todo,
            task: debouncedTask,
          };
        }
        return todo;
      });

      saveTodos(newTodos);
      setTodos(newTodos);
    }
  }, [debouncedTask]);

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
        <div className="flex items-center gap-4 px-3 py-5 border-[3px] border-blue-900 rounded-3xl shadow-md">
          <div onClick={() => toggleTodoList(currentTodo.id)}>{currentTodo.checked ? <CheckBoxCheckedIcon /> : <UncheckedBoxIcon />}</div>
          <input type="text" className="w-full outline-none" placeholder="+ 할 일 추가" value={task} onChange={handleInputChange} />
        </div>
      )}
    </>
  );
}

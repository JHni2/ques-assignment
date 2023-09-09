import { useTodos } from '@/hooks/useSSR';
import { loadTodos } from '@/store/todoStorage';
import { useEffect } from 'react';
import TodoItem from './TodoItem';
import { TodoType } from './TodoList';

export default function TodoListBox() {
  const [todos, setTodos] = useTodos();

  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  return (
    <ul>
      {todos.map((todo: TodoType) => {
        return <TodoItem id={todo.id} key={todo.id} task={todo.task} checked={todo.checked} date={todo.date} memo={todo.memo} createdAt={todo.createdAt} />;
      })}
    </ul>
  );
}

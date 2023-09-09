import { TodoType } from '@/components/TodoList';

export const saveTodos = (todos: TodoType[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const loadTodos = () => {
  const todos = localStorage.getItem('todos');

  if (!todos) {
    return [];
  } else {
    return JSON.parse(todos);
  }
};

export const saveCurrentTodo = (todo: TodoType) => {
  localStorage.setItem('currentTodo', JSON.stringify(todo));
};

export const loadCurrentTodo = () => {
  const currentTodo = localStorage.getItem('currentTodo');

  if (!currentTodo) {
    return [];
  } else {
    return JSON.parse(currentTodo);
  }
};

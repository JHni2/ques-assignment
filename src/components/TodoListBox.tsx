import TodoItem from './TodoItem';
import { TodoType } from './TodoList';

type Props = {
  todos: TodoType[];
};

export default function TodoListBox({ todos }: Props) {
  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem id={todo.id} key={todo.id} task={todo.task} checked={todo.checked} date={todo.date} memo={todo.memo} />;
      })}
    </ul>
  );
}

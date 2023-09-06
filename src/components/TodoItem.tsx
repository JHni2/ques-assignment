import { TodoType } from './TodoList';
import CheckBoxCheckedIcon from './ui/icons/CheckBoxIcon';
import UncheckedBoxIcon from './ui/icons/UncheckedBoxIcon';

export default function TodoItem({ id, title, checked, date, memo }: TodoType) {
  return (
    <li className="flex items-center gap-4 mb-4">
      {checked ? <CheckBoxCheckedIcon /> : <UncheckedBoxIcon />}
      <span className="text-lg">{title}</span>
    </li>
  );
}

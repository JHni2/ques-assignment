import { FaRegTrashAlt } from 'react-icons/fa';

type Props = {
  size?: number;
};

export default function TrashIcon({ size = 22 }: Props) {
  return <FaRegTrashAlt size={size} className="text-blue-900 cursor-pointer" />;
}

import { IoMdAddCircle } from 'react-icons/io';

type Props = {
  size?: number;
};

export default function AddIcon({ size = 24 }: Props) {
  return <IoMdAddCircle size={size} className="text-blue-900 cursor-pointer" />;
}

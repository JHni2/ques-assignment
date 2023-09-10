import { BiPlus } from 'react-icons/bi';

type Props = {
  size?: number;
};

export default function PlusIcon({ size = 24 }: Props) {
  return <BiPlus size={size} className="text-blue-900/50 cursor-pointer" />;
}

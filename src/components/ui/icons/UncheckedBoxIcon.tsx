import { IoSquareOutline } from 'react-icons/io5';

type Props = {
  size?: number;
};

export default function UncheckedBoxIcon({ size = 28 }: Props) {
  return <IoSquareOutline size={size} className="text-blue-900 shrink-0 mb-auto cursor-pointer" />;
}

import { IoChevronBackOutline } from 'react-icons/io5';

type Props = {
  size?: number;
};

export default function BackIcon({ size = 24 }: Props) {
  return <IoChevronBackOutline size={size} className="text-blue-900 cursor-pointer" />;
}

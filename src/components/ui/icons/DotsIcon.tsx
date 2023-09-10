import { PiDotsThreeCircle } from 'react-icons/pi';

type Props = {
  size?: number;
  className: string;
};

export default function DotsIcon({ size = 28, className = '' }: Props) {
  return <PiDotsThreeCircle size={size} className={`text-blue-900 shrink-0 mb-auto cursor-pointer + ${className}`} />;
}

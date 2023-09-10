import { BsXCircleFill } from 'react-icons/bs';

type Props = {
  size?: number;
};

export default function XIcon({ size = 20 }: Props) {
  return <BsXCircleFill size={size} className="text-blue-900 shrink-0 mb-auto cursor-pointer z-10" />;
}

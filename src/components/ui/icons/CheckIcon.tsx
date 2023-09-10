import { BsCheckLg } from 'react-icons/bs';

type Props = {
  size?: number;
};

export default function CheckIcon({ size = 12 }: Props) {
  return <BsCheckLg size={size} className="shrink-0 cursor-pointer" />;
}

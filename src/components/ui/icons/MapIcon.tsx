import { BiSolidMap } from 'react-icons/bi';

type Props = {
  size?: number;
};

export default function MapIcon({ size = 16 }: Props) {
  return <BiSolidMap size={size} />;
}

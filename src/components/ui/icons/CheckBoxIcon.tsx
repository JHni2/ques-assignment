import { IoMdCheckbox } from 'react-icons/io';

type Props = {
  size?: number;
};

export default function CheckBoxCheckedIcon({ size = 28 }: Props) {
  return <IoMdCheckbox size={size} className="text-blue-900 shrink-0 mb-auto cursor-pointer" />;
}

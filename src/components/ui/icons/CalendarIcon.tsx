import { MdEditCalendar } from 'react-icons/md';

type Props = {
  size?: number;
};

export default function CalendarIcon({ size = 24 }: Props) {
  return <MdEditCalendar size={size} className="text-blue-900 shrink-0 mb-auto opacity-40 cursor-pointer" />;
}

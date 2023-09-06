import Link from 'next/link';
import AddIcon from './AddIcon';

export default function ScrollToInput() {
  return (
    <div className="fixed right-[40px] bottom-[40px] cursor-pointer z-20">
      <Link href={'#todo-input'}>
        <AddIcon size={40} />
      </Link>
    </div>
  );
}

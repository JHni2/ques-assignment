import BackIcon from './ui/icons/BackIcon';
import TrashIcon from './ui/icons/TrashIcon';

export default function DetailHeader() {
  return (
    <header className="fixed w-full h-[60px] z-50">
      <div className="flex justify-between items-center max-w-[1024px] px-3 py-5">
        <BackIcon />
        <div className="flex flex-col">
          <span className="font-sm text-blue-900">Task</span>
          <span className="text-lg font-bold">할 일</span>
        </div>
        <TrashIcon />
      </div>
    </header>
  );
}

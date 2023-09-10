import Link from 'next/link';

export default function Header() {
  return (
    <header id="header" className="fixed w-full bg-white z-50">
      <div className="flex justify-between items-center max-w-[1024px] mx-auto px-3 py-3">
        <div className="w-full flex flex-col items-center">
          <Link href={`#header`}>
            <span className="font-sm text-blue-900 font-bold">My own diary</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

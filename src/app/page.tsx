import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import Weather from '@/components/Weather';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="w-full max-w-[1024px] p-4 mx-auto relative top-[55px]">
        <Weather />
        <TodoList />
      </main>
    </div>
  );
}

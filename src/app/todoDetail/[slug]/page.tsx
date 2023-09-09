import DetailTodo from '@/components/DetailTodo';
import DetailHeader from '../../../components/DetailHeader';

type Props = {
  params: {
    slug: number;
  };
};

export default function TodoDetailPage({ params: { slug } }: Props) {
  return (
    <section>
      <DetailHeader />
      <DetailTodo id={slug} />
    </section>
  );
}

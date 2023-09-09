import DetailDate from './DetailDate';
import DetailMemo from './DetailMemo';

export default function DetailContent() {
  return (
    <div className="flex flex-col gap-1 rounded-3xl shadow-md mb-4">
      <DetailDate />
      <div className="border-b-[3px] opacity-50" />
      <DetailMemo />
    </div>
  );
}

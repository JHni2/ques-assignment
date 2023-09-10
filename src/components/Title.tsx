type Props = {
  en: string;
  kr: string;
};

export default function Title({ en, kr }: Props) {
  return (
    <div className="flex flex-col items-center mb-4">
      <span className="text-sm font-semibold text-blue-900">{en}</span>
      <span className="text-lg font-bold">{kr}</span>
    </div>
  );
}

import { useStorageSort } from '@/hooks/useSSR';
import CheckIcon from './ui/icons/CheckIcon';

type Props = {
  fieldKr?: '생성일' | '제목' | '체크';
  fieldEn?: 'createdAt' | 'title' | 'check';
  orderKr?: '오름차순' | '내림차순';
  orderEn?: 'asc' | 'des';
  sortField?: 'createdAt' | 'title' | 'check' | '';
  setSortField?: (field: 'createdAt' | 'title' | 'check') => void;
  sortOrder?: 'asc' | 'des' | '';
  setSortOrder?: (order: 'asc' | 'des') => void;
};

export default function SortOption({ fieldKr, fieldEn, orderEn, orderKr, sortField, setSortField, sortOrder, setSortOrder }: Props) {
  const [storageSort, setStorageSort] = useStorageSort();

  return (
    <>
      {fieldEn && fieldKr && setSortField && (
        <div onClick={() => setSortField(fieldEn)} className="flex gap-2 items-center cursor-pointer px-7">
          {storageSort.field === fieldEn ? <CheckIcon /> : <div className="w-[12px]" />} <span>{fieldKr}</span>
        </div>
      )}
      {orderEn && orderKr && setSortOrder && (
        <div onClick={() => setSortOrder(orderEn)} className="flex gap-2 items-center cursor-pointer px-7">
          {storageSort.order === orderEn ? <CheckIcon /> : <div className="w-[12px]" />} <span>{orderKr}</span>
        </div>
      )}
    </>
  );
}

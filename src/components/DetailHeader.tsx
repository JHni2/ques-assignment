'use client';
import Link from 'next/link';
import BackIcon from './ui/icons/BackIcon';
import TrashIcon from './ui/icons/TrashIcon';
import AlertDetail from './AlertDetail';
import AlertModal from './ui/icons/AlertModal';
import { useState } from 'react';
import ModalPortal from './ui/icons/ModalPortal';

export default function DetailHeader() {
  const [openModal, setOpenModal] = useState(false);

  const clickDeleteBtn = () => {
    setOpenModal(true);
  };

  return (
    <header className="fixed w-full h-[60px] z-50">
      <div className="flex justify-between items-center max-w-[1024px] mx-auto px-3 py-5">
        <Link href="/">
          <BackIcon />
        </Link>
        <div className="flex flex-col">
          <span className="font-sm text-blue-900">Task</span>
          <span className="text-lg font-bold">할 일</span>
        </div>
        <div onClick={() => clickDeleteBtn()}>
          <TrashIcon />
        </div>
      </div>

      {openModal && (
        <ModalPortal>
          <AlertModal onClose={() => setOpenModal(false)}>
            <AlertDetail onClose={() => setOpenModal(false)} />
          </AlertModal>
        </ModalPortal>
      )}
    </header>
  );
}

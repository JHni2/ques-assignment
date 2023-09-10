import { useCurrentTodo, useTodos } from '@/hooks/useSSR';
import { saveTodos } from '@/store/todoStorage';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { defualtImage } from './DetailPhoto';
import { TodoType } from './TodoList';
import PlusIcon from './ui/icons/PlusIcon';
import imageCompression from 'browser-image-compression';
import { BeatLoader } from 'react-spinners';

type Props = {
  imgSrc: string;
  setImgSrc: (imgSrc: string) => void;
};

export default function ImageUpload({ imgSrc, setImgSrc }: Props) {
  const [todos, setTodos] = useTodos();
  const [currentTodo, setCurrentTodo] = useCurrentTodo();
  const [imgLoading, setImgLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    fileRef?.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const getImgUpload = async (image: File) => {
      const resizingBlob = await imageCompression(image, { maxSizeMB: 0.5 });
      const resizingFile = new File([resizingBlob], image.name, { type: image.type });
      return resizingFile;
    };

    const fileReader = new FileReader();
    fileReader.readAsDataURL(await getImgUpload(file));
    fileReader.onload = async (e) => {
      if (typeof e.target?.result === 'string') {
        setImgLoading(false);
        setImgSrc(e.target.result);
      }
    };
  };

  useEffect(() => {
    setImgSrc(currentTodo.img);
  }, [currentTodo.img]);

  useEffect(() => {
    if (currentTodo.id !== 1) {
      const newTodos = todos.map((todo: TodoType) => {
        if (todo.id === Number(currentTodo.id)) {
          return {
            ...todo,
            img: imgSrc,
          };
        }
        return todo;
      });

      saveTodos(newTodos);
      setTodos(newTodos);
    }
  }, [imgSrc]);

  return (
    <form className="w-full">
      <input ref={fileRef} className="hidden" type="file" accept="image/*" onChange={handleChange} />
      <label htmlFor="file" className="cursor-pointer">
        <div className="flex flex-col items-center justify-center gap-1 min-h-[243px]" onClick={handleClick}>
          {imgSrc === defualtImage ? (
            <>
              {imgLoading ? (
                <div>
                  <BeatLoader color="#1e3a8a" size={10} />
                </div>
              ) : (
                <>
                  <PlusIcon />
                  <span className="text-sm text-blue-900/50">사진 첨부</span>
                </>
              )}
            </>
          ) : (
            <div className="relative w-full min-h-[243px]">
              <Image src={imgSrc} alt="img" fill sizes="650px" priority className="object-contain" />
            </div>
          )}
        </div>
      </label>
    </form>
  );
}

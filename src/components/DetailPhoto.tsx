import { useState } from 'react';
import ImageUpload from './ImageUpload';
import XIcon from './ui/icons/XIcon';

export const defualtImage = '/images/default-image.png';

export default function DetailPhoto() {
  const [imgSrc, setImgSrc] = useState<string>(defualtImage);

  return (
    <div className="flex flex-col">
      {imgSrc !== defualtImage && (
        <div onClick={() => setImgSrc(defualtImage)} className="relative top-[10px] flex justify-end">
          <XIcon />
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-1 min-h-[243px] rounded-3xl shadow-md">
        <ImageUpload imgSrc={imgSrc} setImgSrc={setImgSrc} />
      </div>
    </div>
  );
}

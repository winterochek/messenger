'use client';

import Image from 'next/image';
import Modal from '..';

interface Props {
   src: string | null;
   isOpen: boolean;
   onClose: () => void;
}

export default function ImageModal({ src, isOpen, onClose }: Props) {
   if (!src) return null;
   return <Modal isOpen={isOpen} onClose={onClose}>
    <div className='w-80 h-80'>
        <Image alt='Image' className='object-cover' fill src={src} />
    </div>
   </Modal>;
}

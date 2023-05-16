'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { IconType } from 'react-icons';

interface Props {
   label: string;
   href: string;
   icon: IconType;
   active?: boolean;
   onClick?: () => void;
}

export default function MobileItem({
   href,
   label,
   icon: Icon,
   active,
   onClick,
}: Props) {
   const handleClick = () => {
      if (!onClick) return;
      return onClick();
   };
   return (
      <Link 
      href={href} 
      onClick={handleClick}
      className={clsx("group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
      active && "bg-gray-100 text-black"
      )}
      >
         <Icon className='h-6 w-6' />
      </Link>
   );
}

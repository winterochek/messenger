'use client';

import Avatar from '@/app/components/avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Props {
   isLast: boolean;
   message: FullMessageType;
}

export default function MessageBox({ message, isLast }: Props) {
   const session = useSession();

   const isOwn = session?.data?.user?.email === message?.sender.email;
   const seenList = (message.seen || [])
      .filter((user) => user.email !== message?.sender?.email)
      .map((user) => user.name)
      .join(', ');

   const containerStyles = clsx('flex gap-3 p-4', isOwn && 'justify-end');
   const avatarStyles = clsx(isOwn && 'order-2');
   const bodyStyles = clsx('flex flex-col gap-2', isOwn && 'items-end');
   const messageStyles = clsx(
      'text-sm w-fit overflow-hidden',
      isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
      message?.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
   );

   return (
      <div className={containerStyles}>
         <div className={avatarStyles}>
            <Avatar user={message?.sender} />
         </div>
         <div className={bodyStyles}>
            <div className='flex items-center gap-1'>
               <div className='text-sm text-gray-500'>
                  {message.sender.name}
               </div>
               <div className='text-xs text-gray-400 '>
                  {format(new Date(message?.createdAt), 'p')}
               </div>
            </div>
            <div className={messageStyles}>
               {message.image ? (
                  <Image
                     alt='Image'
                     height={288}
                     width={288}
                     src={message.image}
                     className='object-cover cursor-pointer hover:scale-110 transition translate'
                  />
               ) : (
                  <div>{message.body}</div>
               )}
            </div>
            {isLast && isOwn && seenList.length > 0 && (
               <div className='text-xs font-light text-gray-500 pr-3'>{`Seen by ${seenList}`}</div>
            )}
         </div>
      </div>
   );
}

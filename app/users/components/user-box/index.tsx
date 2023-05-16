'use client';

import Avatar from '@/app/components/avatar';
import { useLoadingState } from '@/app/hooks';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
   user: User;
}

export default function UserBox({ user }: Props) {
   const router = useRouter();
   const { isLoading, startLoading, finishLoading } = useLoadingState();

   const handleClick = useCallback(() => {
      startLoading();
      axios
         .post('/api/conversations', {
            userId: user.id,
         })
         .then((data) => {
            router.push(`/conversations/${data.data.id}`);
         })
         .finally(() => {
            finishLoading();
         });
   }, [startLoading, user.id, router, finishLoading]);

   return (
      <div
         className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
         onClick={handleClick}
      >
         <Avatar user={user} />
         <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
               <div className='flex justify-between mb-1 items-center'>
                  <p className='text-sm font-medium text-gray-900 '>
                     {user.name}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

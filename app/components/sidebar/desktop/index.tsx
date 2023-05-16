'use client';

import { useState } from 'react';
import { useRoutes } from '@/app/hooks';
import DesktopItem from './item';
import Avatar from '../../avatar';
import { User } from '@prisma/client';

interface Props {
   user: User;
}

export default function DesktopSidebar({ user }: Props) {
   const routes = useRoutes();
   const [isOpen, setIsOpen] = useState(false);

   console.log(user);
   return (
      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between'>
         <nav className='mt-4 flex flex-col justify-between'>
            <ul role='list' className='flex flex-col items-center space-y-1 '>
               {routes.map((item) => (
                  <DesktopItem key={item.label} {...item} />
               ))}
            </ul>
         </nav>
         <nav className='mt-4 flex flex-col items-center justify-between'>
            <div
               onClick={() => setIsOpen(true)}
               className='cursor-pointer hover:opacity-75 transition'
            >
               <Avatar user={user} />
            </div>
         </nav>
      </div>
   );
}

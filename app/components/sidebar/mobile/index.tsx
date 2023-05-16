'use client';

import { useRoutes, useConversation } from '@/app/hooks';
import MobileItem from './item';

export default function MobileFooter() {
   const routes = useRoutes();
   const { isOpen } = useConversation();

   if (isOpen) return null;

   return (
      <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
         {routes.map((item) => (
            <MobileItem key={item.label} {...item} />
         ))}
      </div>
   );
}

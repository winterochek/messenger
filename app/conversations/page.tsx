'use client';

import clsx from 'clsx';
import { useConversation } from '../hooks';
import EmptyState from '../components/empty-state';

export default function Home() {
   const { isOpen } = useConversation();
   return (
      <div className={clsx(
        'lg:pl-80 h-full lg:block',
        isOpen ? 'block' : 'hidden'
      )}>
         <EmptyState />
      </div>
   );
}

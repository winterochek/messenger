'use client';

import ConversationBox from '../conversation-box';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConversation } from '@/app/hooks';
import { FullConversationType } from '@/app/types';

import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';

interface Props {
   initialConversations: FullConversationType[];
}

export default function ConversationsList({ initialConversations }: Props) {
   const [items, setItems] = useState(initialConversations);
   const { conversationId, isOpen } = useConversation();
   const router = useRouter();
   return (
      <aside
         className={clsx(
            'fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200',
            isOpen ? 'hidden' : 'block w-full left-0'
         )}
      >
         <div className='px-5'>
            <div className='flex justify-between mb-4 pt-4'>
               <div className='text-2xl font-bold text-neutral-800'>
                  Messages
               </div>
               <div className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
                  <MdOutlineGroupAdd size={20} />
               </div>
            </div>
            {items.map((item) => (
               <ConversationBox conversation={item} selected={conversationId === item.id} key={item.id} />
            ))}
         </div>
      </aside>
   );
}

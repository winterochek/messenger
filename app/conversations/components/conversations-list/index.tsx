'use client';

import ConversationBox from '../conversation-box';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConversation, useModal } from '@/app/hooks';
import { FullConversationType } from '@/app/types';

import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';
import GroupChatModel from '@/app/components/modal/group-chat-modal';
import { User } from '@prisma/client';

interface Props {
   initialConversations: FullConversationType[];
   users: User[];
}

export default function ConversationsList({
   initialConversations,
   users,
}: Props) {
   const [items, setItems] = useState(initialConversations);
   const { open, openModal, closeModal } = useModal();

   const { conversationId, isOpen } = useConversation();
   const router = useRouter();
   return (
      <>
         <GroupChatModel isOpen={open} onClose={closeModal} users={users}/>
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
                  <div
                     onClick={openModal}
                     className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'
                  >
                     <MdOutlineGroupAdd size={20} />
                  </div>
               </div>
               {items.map((item) => (
                  <ConversationBox
                     conversation={item}
                     selected={conversationId === item.id}
                     key={item.id}
                  />
               ))}
            </div>
         </aside>
      </>
   );
}

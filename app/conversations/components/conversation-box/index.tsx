'use client';

import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { FullConversationType } from '@/app/types';
import { Message, User, Conversation } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/avatar';
import AvatarGroup from '@/app/components/avatar/avatar-group';

interface Props {
   conversation: FullConversationType;
   selected: boolean;
}

export default function ConversationBox({ conversation, selected }: Props) {
   const otherUser = useOtherUser(conversation);
   const session = useSession();
   const router = useRouter();

   const handleClick = useCallback(() => {
      router.push(`/conversations/${conversation.id}`);
   }, [conversation.id, router]);

   const lastMessage = useMemo(() => {
      const messages = conversation.messages || [];
      return messages[messages.length - 1];
   }, [conversation.messages]);

   const userEmail = useMemo(() => {
      return session.data?.user?.email;
   }, [session.data?.user?.email]);

   const hasSeen = useMemo(() => {
      if (!lastMessage || !userEmail) return false;
      const seen = lastMessage.seen || [];
      return !!seen.filter((item) => item.email === userEmail).length;
   }, [lastMessage, userEmail]);

   const lastMessageText = useMemo(() => {
      if (lastMessage?.image) return 'Sent an image';
      if (lastMessage?.body) return lastMessage.body;
      return 'Started a conversation';
   }, [lastMessage]);

   return (
      <div
         onClick={handleClick}
         className={clsx(
            'w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',
            selected ? 'bg-neutral-100' : 'bg-white'
         )}
      >
         {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
         ) : (
            <Avatar user={otherUser} />
         )}
         <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
               <div className='flex justify-between items-center mb-1'>
                  <p className='text-md font-medium text-gray-900'>
                     {conversation.name || otherUser.name}
                  </p>
                  {lastMessage?.createdAt && (
                     <p className='text-xs text-gray-400 font-light'>
                        {format(new Date(lastMessage.createdAt), 'p')}
                     </p>
                  )}
               </div>
               <p
                  className={clsx(
                     'truncate text-sm ',
                     hasSeen ? 'text-gray-500' : 'text-black font-medium'
                  )}
               >
                  {lastMessageText}
               </p>
            </div>
         </div>
      </div>
   );
}

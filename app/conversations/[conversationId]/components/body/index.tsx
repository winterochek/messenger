'use client';

import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '@/app/types';
import { useConversation } from '@/app/hooks';
import MessageBox from './message-box';
import axios from 'axios';

interface Props {
   initialMessages: FullMessageType[];
}

export default function Body({ initialMessages }: Props) {
   const [messages, setMessages] = useState(initialMessages);
   const bottomRef = useRef<HTMLDivElement>(null);
   const { conversationId } = useConversation();

   useEffect(() => {
      axios.post(`/api/conversations/${conversationId}/seen`);
   }, [conversationId]);

   return (
      <div className='flex-1 overflow-y-auto'>
         {messages.map((message, idx) => (
            <MessageBox
               isLast={idx === messages.length - 1}
               key={message.id}
               message={message}
            />
         ))}
         <div ref={bottomRef} className='pt-24' />
      </div>
   );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '@/app/types';
import { useConversation } from '@/app/hooks';
import MessageBox from './message-box';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

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

   useEffect(() => {
      pusherClient.subscribe(conversationId);

      const messageHandler = (message: FullMessageType) => {
         bottomRef?.current?.scrollIntoView();
         axios.post(`/api/conversations/${conversationId}/seen`);
         setMessages((current) => {
            if (find(current, { id: message.id })) {
               return current;
            }
            return [...current, message];
         });
      };

      const updateMessageHandler = (newMessage: FullMessageType) => {
         setMessages((current) => {
            return current.map((currentMessage) => {
               if (currentMessage.id === newMessage.id) return newMessage;
               return currentMessage;
            });
         });
      };
      pusherClient.bind('messages:new', messageHandler);
      pusherClient.bind('message:update', updateMessageHandler);

      bottomRef?.current?.scrollIntoView();

      return () => {
         pusherClient.unsubscribe(conversationId);

         pusherClient.unbind('messages:new', messageHandler);
         pusherClient.unbind('message:update', updateMessageHandler);
      };
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

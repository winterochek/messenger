import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/empty-state';
import Header from './components/header';
import Body from './components/body';
import Form from './components/form';

interface Props {
   params: {
      conversationId: string;
   };
}

export default async function ConversationId({ params }: Props) {
   const conversation = await getConversationById(params.conversationId);
   const messages = await getMessages(params.conversationId);

   if (!conversation) {
      return (
         <div className='lg:pl-80 h-full'>
            <div className='h-full flex flex-col'>
               <EmptyState />
            </div>
         </div>
      );
   }

   return (
      <div className='lg:pl-80 h-full'>
         <div className='flex flex-col h-full'>
            <Header conversation={conversation} />
            <Body />
            <Form />
         </div>
      </div>
   );
}

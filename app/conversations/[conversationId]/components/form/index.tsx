'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useConversation } from '@/app/hooks';
import MessageInput from './componens/message-input';
import { HiPhoto } from 'react-icons/hi2';

interface Props {}

export default function Form() {
   const { conversationId } = useConversation();
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<FieldValues>({
      defaultValues: {
         message: '',
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setValue('message', '', { shouldValidate: true });
      axios.post('/api/messages', { ...data, conversationId });
   };

   return (
      <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
         <HiPhoto
            size={30}
            className='text-sky-500 hover:text-sky-600 cursor-pointer'
         />
         <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex items-center gap-2 lg:gap-4 w-full'
         >
            <MessageInput
               id='message'
               register={register}
               errors={errors}
               required
               placeholder='Write a message'
            />
         </form>
      </div>
   );
}

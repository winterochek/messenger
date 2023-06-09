'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useConversation } from '@/app/hooks';
import MessageInput from './componens/message-input';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { CldUploadButton } from 'next-cloudinary';

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

   const handleUpload = (result: any) => {
      axios.post('/api/messages', {
         image: result?.info?.secure_url,
         conversationId,
      });
   };

   return (
      <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
         <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset='s2gtprtl'
         >
            <HiPhoto
               size={30}
               className='text-sky-500 hover:text-sky-600 cursor-pointer'
            />
         </CldUploadButton>
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
            <button
               type='submit'
               className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
            >
               <HiPaperAirplane size={18} className='text-white' />
            </button>
         </form>
      </div>
   );
}

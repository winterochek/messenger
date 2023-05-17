'use client';

import { User } from '@prisma/client';
import Modal from '..';
import { useRouter } from 'next/navigation';
import { useLoadingState } from '@/app/hooks';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Input from '../../inputs/Input';
import Select from '../../inputs/select';
import Button from '../../button';

interface Props {
   isOpen: boolean;
   onClose: () => void;
   users: User[];
}

export default function GroupChatModel({ isOpen, onClose, users }: Props) {
   const router = useRouter();
   const { isLoading, startLoading, finishLoading } = useLoadingState();
   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         members: [],
      },
   });

   const members = watch('members');

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      startLoading();
      axios
         .post('/api/conversations', {
            ...data,
            isGroup: true,
         })
         .then(() => {
            router.refresh();
            onClose();
         })
         .catch(() => {
            toast.error('Something went wrong');
         })
         .finally(() => {
            finishLoading();
         });
   };
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-12'>
               <div className='border-b border-gray-900/10 pb-4'>
                  <h2 className='text-base font-semibold leading-7 text-gray-900'>
                     Create a group chat
                  </h2>
                  <p className='mt-1 text-sm leading-6 text-gray-600'>
                     Create a chat with more than two people
                  </p>
                  <div className='mt-10 flex flex-col gap-y-8'>
                     <Input
                        register={register}
                        label='Name'
                        id='name'
                        disabled={isLoading}
                        required
                        errors={errors}
                     />
                     <Select
                        disabled={isLoading}
                        label='Members'
                        options={users.map((user) => ({
                           value: user.id,
                           label: user.name,
                        }))}
                        onChange={(value) =>
                           setValue('members', value, { shouldValidate: true })
                        }
                        value={members}
                     />
                  </div>
               </div>
            </div>
            <div className='mt-6 flex items-center justify-end gap-x-6'>
               <Button
                  disabled={isLoading}
                  onClick={onClose}
                  type='button'
                  secondary
               >
                  Cancel
               </Button>
               <Button type='submit' disabled={isLoading}>
                  Create
               </Button>
            </div>
         </form>
      </Modal>
   );
}

'use client';

import Button from '@/app/components/button';
import Modal from '@/app/components/modal';
import { useConversation, useLoadingState } from '@/app/hooks';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

interface Props {
   isOpen?: boolean;
   onClose: () => void;
}

export default function ConfirmModal({ isOpen, onClose }: Props) {
   const router = useRouter();
   const { conversationId } = useConversation();
   const { isLoading, startLoading, finishLoading, changeLoadingState } =
      useLoadingState();

   const onDelete = useCallback(() => {
      startLoading();

      axios
         .delete(`/api/conversations/${conversationId}`)
         .then(() => {
            onClose();
            router.push('/conversations');
            router.refresh();
         })
         .catch(() => toast.error('Something went wrong'))
         .finally(() => finishLoading());
   }, [startLoading, conversationId, onClose, router, finishLoading]);
   return (
      <Modal isOpen={!!isOpen} onClose={onClose}>
         <div className='sm:flex sm:items-start'>
            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
               <FiAlertTriangle
                  className='h-6 w-6 text-red-600'
                  aria-hidden='true'
               />
            </div>
            <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
               <Dialog.Title
                  as='h3'
                  className='text-base bont-semibold leading-6 text-gray-900'
               >
                  Delete conversation
               </Dialog.Title>
               <div className='mt-2 '>
                  <p className='text-sm text-gray-500'>
                     Are you sure you want to delete this conversation? This
                     action can not be undone.
                  </p>
               </div>
            </div>
         </div>
         <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <Button disabled={isLoading} danger onClick={onDelete}>
               Delete
            </Button>
            <Button disabled={isLoading} secondary onClick={onClose}>
               Cancel
            </Button>
         </div>
      </Modal>
   );
}
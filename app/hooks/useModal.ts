'use client';

import { useCallback, useState } from 'react';

type ReturnType = {
   open: boolean;
   openModal: () => void;
   closeModal: () => void;
};

const useModal = (): ReturnType => {
   const [open, setOpen] = useState(false);

   const openModal = useCallback(() => {
      setOpen((v) => true);
   }, []);
   const closeModal = useCallback(() => {
      setOpen((v) => false);
   }, []);

   return {
      open,
      openModal,
      closeModal,
   };
};

export default useModal

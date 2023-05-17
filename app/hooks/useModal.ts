'use client';

import { useCallback, useState } from 'react';

type ReturnType = {
   open: boolean;
   openModal: () => void;
   closeModal: () => void;
};

const useModal = (initial = false): ReturnType => {
   const [open, setOpen] = useState(initial);

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

export default useModal;

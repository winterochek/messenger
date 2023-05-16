'use client';
import { useState } from 'react';

type ReturnType = {
   isLoading: boolean;
   startLoading: () => void;
   finishLoading: () => void;
   changeLoadingState: () => void;
};

const useLoadingState = (): ReturnType => {
   const [isLoading, setIsLoading] = useState(false);
   const startLoading = () => {
      setIsLoading(true);
   };
   const finishLoading = () => {
      setIsLoading(false);
   };
   const changeLoadingState = () => {
      setIsLoading((v) => !v);
   };

   return {
      isLoading,
      startLoading,
      finishLoading,
      changeLoadingState,
   };
};

export default useLoadingState

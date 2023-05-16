'use client';
import { useCallback, useState } from 'react';

type ReturnType = {
   isLoading: boolean;
   startLoading: () => void;
   finishLoading: () => void;
   changeLoadingState: () => void;
};

const useLoadingState = (): ReturnType => {
   const [isLoading, setIsLoading] = useState(false);
   const startLoading = useCallback(() => {
      setIsLoading(true);
   }, []);
   const finishLoading = useCallback(() => {
      setIsLoading(false);
   }, []);
   const changeLoadingState = useCallback(() => {
      setIsLoading((v) => !v);
   }, []);

   return {
      isLoading,
      startLoading,
      finishLoading,
      changeLoadingState,
   };
};

export default useLoadingState;

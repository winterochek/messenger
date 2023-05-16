import { useParams } from 'next/navigation';
import { useMemo } from 'react';

type ReturnType = {
   isOpen: boolean;
   conversationId: string;
};

const useConversation = (): ReturnType => {
   const params = useParams();
   const conversationId = useMemo(() => {
      if (!params?.conversationId) return '';

      return params.conversationId as string;
   }, [params.conversationId]);

   const isOpen = useMemo(() => !!conversationId, [conversationId]);

   return useMemo(
      () => ({
         isOpen,
         conversationId,
      }),
      [conversationId, isOpen]
   );
};

export default useConversation;

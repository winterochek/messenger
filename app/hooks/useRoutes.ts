import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import useConversation from './useConversation';
import { IconType } from 'react-icons';

type ReturnType = Array<{
   label: string;
   href: string;
   icon: IconType;
   active?: boolean;
   onClick?: () => void;
}>;

const useRoutes = (): ReturnType => {
   const pathname = usePathname();
   const { conversationId, isOpen } = useConversation();

   const routes = useMemo(() => {
      return [
         {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || isOpen,
         },
         {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users',
         },
         {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
         },
      ];
   }, [pathname, isOpen]);

   return routes;
};

export default useRoutes;

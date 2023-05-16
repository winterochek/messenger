import DesktopSidebar from './desktop';
import MobileFooter from './mobile';

import getCurrentUser from '@/app/actions/getCurrentUser';

interface Props {
   children: React.ReactNode;
}

export default async function SideBar({ children }: Props) {
   const currentUser = await getCurrentUser();
   return (
      <div className='h-full'>
         <DesktopSidebar user={currentUser!} />
         <MobileFooter />
         <main className='lg:pl-20 h-full'>{children}</main>
      </div>
   );
}

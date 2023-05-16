import DesktopSidebar from './desktop';
import MobileFooter from './mobile';

interface Props {
   children: React.ReactNode;
}

export default async function SideBar({ children }: Props) {
   return (
      <div className='h-full'>
         <DesktopSidebar />
         <MobileFooter />
         <main className='lg:pl-20 h-full'>{children}</main>
      </div>
   );
}

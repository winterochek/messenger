import getUsers from '../actions/getUsers';
import Sidebar from '../components/sidebar';
import UserList from './components/user-list';

interface Props {
   children: React.ReactNode;
}

export default async function UsersLayout({ children }: Props) {
   const users = await getUsers();
   return (
      //   @ts-expect-error Server Component
      <Sidebar>
         <div className='h-full'>
            <UserList users={users} />
            {children}
         </div>
      </Sidebar>
   );
}

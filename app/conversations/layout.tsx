import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';
import SideBar from '../components/sidebar';
import ConversationsList from './components/conversations-list';

interface Props {
   children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
    const conversations = await getConversations()
    const users = await getUsers()
   return (
      // @ts-expect-error
      <SideBar>
         <div className='h-full'>
            <ConversationsList users={users} initialConversations={conversations} />
            {children}</div>
      </SideBar>
   );
}
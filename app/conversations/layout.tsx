import getConversations from '../actions/getConversations';
import SideBar from '../components/sidebar';
import ConversationsList from './components/conversations-list';

interface Props {
   children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
    const conversations = await getConversations()
   return (
      // @ts-expect-error
      <SideBar>
         <div className='h-full'>
            <ConversationsList initialConversations={conversations} />
            {children}</div>
      </SideBar>
   );
}
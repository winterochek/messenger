import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import { Inter } from 'next/font/google';

import './globals.css';
import ActiveStatus from './components/active-status';

export const metadata = {
   title: 'Messenger',
   description: 'Created by winterochek',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <AuthContext>
               <ToasterContext />
               <ActiveStatus />
               {children}
            </AuthContext>
         </body>
      </html>
   );
}

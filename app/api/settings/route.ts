import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
export async function POST(requst: Request) {
   try {
      const currentUser = await getCurrentUser();
      const { name, image } = await requst.json();

      if (!currentUser?.id)
         return new NextResponse('Unauthorized', { status: 401 });
      const updatedUser = await prisma.user.update({
         where: {
            id: currentUser.id,
         },
         data: {
            image,
            name,
         },
      });
      return NextResponse.json(updatedUser);
   } catch (error) {
      console.log(error, 'ERROR_SETTINGS');
      return new NextResponse('Internal error', { status: 500 });
   }
}

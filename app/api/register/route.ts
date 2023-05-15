import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

type User = {
   email: string;
   name: string;
   hashedPassword: string;
};

export async function POST(request: Request) {
   try {
      const { email, name, password } = await request.json();

      if (!email || !name || !password) {
         return new NextResponse('Missing info', { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
         data: {
            email,
            name,
            hashedPassword,
         } as User,
      });

      return NextResponse.json(user);
   } catch (error) {
      return new NextResponse('Internal error', { status: 500 });
   }
}

import prisma from '@/app/libs/prismadb';

export default function getMessages(conversationId: string) {
   try {
      const messages = prisma.message.findMany({
         where: {
            conversationId: conversationId,
         },
         include: {
            sender: true,
            seen: true,
         },
         orderBy: {
            createdAt: 'asc',
         },
      });

      return messages;
   } catch (error) {
      return [];
   }
}

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', value: 'text' },
        password: { label: 'Password', value: 'password' },
      },
      authorize: async (credentials: { email: string; password: string }) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, email: user.email } as User;
        }

        throw new Error('Invalid credentials');
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);

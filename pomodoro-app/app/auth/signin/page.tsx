'use client'
import Signin from '@/app/components/Signin';
import { getProviders, signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/'
    });
  };

  return (
    <div>
      <Signin />
    </div>
  );
}

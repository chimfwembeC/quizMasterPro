import React from 'react';
import { AuthForm } from '../components/auth/AuthForm';
import { signIn } from '../lib/auth';

export function Login() {
  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await signIn(email, password);
  };

  return <AuthForm type="login" onSubmit={handleSubmit} />;
}
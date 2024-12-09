import React from 'react';
import { AuthForm } from '../components/auth/AuthForm';
import { signUp } from '../lib/auth';

export function Signup() {
  const handleSubmit = async ({ email, password, name, role }: { 
    email: string; 
    password: string; 
    name: string; 
    role: 'student' | 'teacher';
  }) => {
    await signUp(email, password, name, role);
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
}
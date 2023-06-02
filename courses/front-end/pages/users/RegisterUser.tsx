// RegisterUsersPage component
import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import RegisterUserForm from '../../components/users/RegisterAsUser';
import { User } from '../../types/index';
import UserService from '../../services/UserService';
import { useRouter } from 'next/router';

const RegisterUsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (
    username: string,
    email: string,
    firstName:string,
    lastName:string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      const user: User = await UserService.addUser(username, email,firstName,lastName, password);
      setSuccessMessage(`User ${user.username} successfully registered!`);
      router.push('/users/UsersOverview');
    } catch (error: any) {
      setError(new Error('Failed to add user try other email or username'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main>
        <div>
          <h1>Register User</h1>
          <RegisterUserForm onRegister={handleRegister} error={error} />
        </div>
      </main>
    </>
  );
};

export default RegisterUsersPage;

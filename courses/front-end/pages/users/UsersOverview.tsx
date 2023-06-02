import Head from 'next/head'
import Header from '../../components/header'
import { useState, useEffect } from 'react'
import { User } from '../../types/index'
import UsersOverview from '../../components/users/UserOverview'
import UserService from '../../services/UserService'


const Users: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getUsers = async () => {
    try {
      const usersData = await UserService.getAllUsers();
      setUsers(usersData);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main>
        <section className="row justify-content-center">
        <UsersOverview users={users} errorMessage={errorMessage} />
        </section>
      </main>
    </>
  );
};

export default Users
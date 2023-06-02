import Head from 'next/head';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { User } from '../../types/index';
import { useRouter } from 'next/router';
import LoginUserForm from '../../components/users/UserLoginForm';



const LoginUsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const router = useRouter();


  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');

    if (username && token) {
      setErrorMessage(`You are already logged in as ${username}. Please log out to log in with a different account.`);
    }

    handleLogout();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      
      const user: User = await UserService.loginUser(username, password);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('token', JSON.stringify(user).match(/"token":"([^"]+)"/)?.[1]);

      setSuccessMessage(`User ${username} successfully logged in!`);
      router.push('/users/UsersOverview');
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    router.push('/users/Login');
  };

  const token: string | null = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <main>
        <div>
            <>
              <h1>Login User</h1>
              {error && <p className="error-message">{error.message}</p>}
              {successMessage && <p>{successMessage}</p>}
              <LoginUserForm onLogin={handleLogin} onLogout={handleLogout} />
            </>
        </div>
      </main>
    </>
  );
          }

export default LoginUsersPage;
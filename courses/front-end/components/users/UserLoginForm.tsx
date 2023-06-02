import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

type Props = {
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
};

const LoginUserForm: React.FC<Props> = ({ onLogin, onLogout }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();
   
  useEffect(() => {
    const usernameFromStorage = sessionStorage.getItem('username');
    setIsUserLoggedIn(!!usernameFromStorage);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Please fill in all fields');
    } else {
      onLogin(username, password);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    onLogout();
  };

  if (isUserLoggedIn) {
    return (
      <>
        <p>You are already logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginUserForm;

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
    
        router.push('/');
      };

    useEffect(() => {
        const usernameFromStorage = sessionStorage.getItem('username');
        setIsUserLoggedIn(!!usernameFromStorage);
      }, []);

      

      if (isUserLoggedIn) {
        return (
            <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {" "}
                Courses App
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <a href="/lecturers/LecturersOverview" className="nav-link px-4 fs-5 text-white">
                    Lecturers
                </a>
                <a href="/users/UsersOverview" className="nav-link px-4 fs-5 text-white">
                    Users
                </a>
                <a href="#" className="nav-link px-4 fs-5 text-white">
                    Schedules
                </a>
                <a onClick={handleLogout} className="nav-link px-4 fs-5 text-white">
                    Logout
                </a>
            </nav>
        </header>
        );
      } else

    return (
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {" "}
                Courses App
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <a href="/users/RegisterUser" className="nav-link px-4 fs-5 text-white">
                    Register
                </a>
                <a href="/users/Login" className="nav-link px-4 fs-5 text-white">
                    Login
                </a>
            </nav>
        </header>
    );
};

export default Header;

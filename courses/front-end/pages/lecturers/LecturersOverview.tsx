import Head from 'next/head'
import Header from '../../components/header'
import { useState, useEffect } from 'react'
import { Lecturer, User } from '../../types/index'
import UsersOverview from '../../components/users/UserOverview'
import UserService from '../../services/UserService'
import LecturerService from '../../services/LecturerService'
import LecturersOverview from '../../components/lecturers/LecturersOverview'


const Lecturers: React.FC = () => {
  const [lecturers, setLecturers] = useState<Array<Lecturer>>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getLecturers = async () => {
    try {
      const lecturersDara = await LecturerService.getAllLecturers();
      setLecturers(lecturersDara);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getLecturers();
  }, []);

  return (
    <>
      <Head>
        <title>Lecturers</title>
      </Head>
      <Header />
      <main>
        <section className="row justify-content-center">
        <LecturersOverview lecturers={lecturers} errorMessage={errorMessage} />
        </section>
      </main>
    </>
  );
};

export default Lecturers
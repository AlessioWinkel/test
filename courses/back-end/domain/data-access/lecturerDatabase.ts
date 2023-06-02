import { PrismaClient } from '@prisma/client';
import { Lecturer } from '../model/lecturer';
import { User } from '../model/user';
import e from 'express';

const database = new PrismaClient();

const addLecturer = async (lecturerData: {
    userId: number;
    expertise: string;
  }): Promise<Lecturer> => {
    try {
        const currentDate = new Date(); // Get the current date

      const lecturerPrisma = await database.lecturer.create({
        data: {
          userId: lecturerData.userId,
          expertise: lecturerData.expertise,
          createdAt: currentDate
        },
      });
      const userPrisma = await database.user.findUnique({
        where: {
          id: lecturerData.userId,
        },
      });
      const lecturer = Lecturer.from({ ...lecturerPrisma, user: userPrisma });
      return lecturer;
    } catch (error) {
      console.error(error);
      throw new Error('DB Error');
    }
  }

  

  const getLecturerById = async (id: number): Promise<Lecturer> => {
    try {
      const lecturerPrisma = await database.lecturer.findUnique({
        where: {
          id: id,
        },
      });
  
      const userPrisma = await database.user.findUnique({ // Retrieve the associated 'User' object from the database
        where: {
          id: lecturerPrisma.userId,
        },
      });

      
      const user = new User({
        id: userPrisma.id,
        username:userPrisma.username,
        firstName: userPrisma.firstName,
        lastName: userPrisma.lastName,
        email: userPrisma.email,
        password:userPrisma.password
      });

      const lecturer = new Lecturer({
        id: lecturerPrisma.id,
        user: user,
        expertise: lecturerPrisma.expertise,
        createdAt: lecturerPrisma.createdAt,
        updatedAt: lecturerPrisma.updatedAt,
      });
  
      return lecturer;
    } catch (error) {
      console.error(error);
      throw new Error('DB Error');
    }
  };

  const getAllLecturers = async (): Promise<Lecturer[]> => {
    try {
      const lecturersPrisma = await database.lecturer.findMany();
  
      const lecturers: Lecturer[] = [];
      for (const lecturerPrisma of lecturersPrisma) {
        const userPrisma = await database.user.findUnique({
          where: {
            id: lecturerPrisma.userId,
          },
        });
  
        const user = new User({
          id: userPrisma.id,
          username: userPrisma.username,
          firstName: userPrisma.firstName,
          lastName: userPrisma.lastName,
          email: userPrisma.email,
          password: userPrisma.password,
        });
  
        const lecturer = new Lecturer({
          id: lecturerPrisma.id,
          user: user,
          expertise: lecturerPrisma.expertise,
          createdAt: lecturerPrisma.createdAt,
          updatedAt: lecturerPrisma.updatedAt,
        });
  
        lecturers.push(lecturer);
      }
  
      return lecturers;
    } catch (error) {
      console.error(error);
      throw new Error('DB Error');
    }
  };
  

export default { addLecturer, getLecturerById, getAllLecturers };

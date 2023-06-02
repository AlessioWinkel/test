import {Prisma, PrismaClient} from '@prisma/client'
import { User } from '../model/user';


let currentId =  1;
const database = new PrismaClient()

const addUser = async ({ username,firstName,lastName,email,password}:{username: string, firstName:string,lastName:string,email: string, password:string}): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username,
                firstName,
                lastName,
                email,
                password
            }
        });
        return User.mapToUser(userPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('DB Error')
    }
}


const getUserByNameForRegistration = async (username: string): Promise<User> => {
    const userPrisma = await database.user.findUnique({
      where: {
        username: username,
      },
    });
    
    if (!userPrisma) {
        return null;
    }
  
    return User.mapToUser(userPrisma);
  }

  const getUserById = async (id: number): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
        });
        return User.mapToUser(userPrisma);
    } catch (error) {
        console.error(error);
        throw Error('Database error. See server log for details')
    }
}


  const getUserByName = async (username: string): Promise<User> => {
    const userPrisma = await database.user.findUnique({
      where: {
        username: username,
      },
    });
    
    if (!userPrisma) {
      throw new Error(`User with username ${username} not found`);
    }
  
    return User.mapToUser(userPrisma);
  }
  


const getAllUsers = async (): Promise<User[]> => {
    try {
      const usersPrisma = await database.user.findMany({
        select: {
          id: true,
          username: true,
          firstName:true,
          lastName:true,
          email: true,
          password: true
        }
      });
      return User.mapToUsers(usersPrisma);
    } catch (error) {
      console.error(error);
      throw new Error('DB Error');
    }
  };




export default {addUser,getAllUsers,getUserByNameForRegistration,getUserByName,getUserById}
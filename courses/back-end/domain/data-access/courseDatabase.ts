import {Prisma, PrismaClient} from '@prisma/client'
import { User } from '../model/user';
import { Course } from '../model/course';


let currentId =  1;
const database = new PrismaClient()

const addCourse = async ({ name,credits,semester}:{name: string, credits:number,semester:number}): Promise<Course> => {
    try {
        const coursePrisma = await database.course.create({
            data: {
                name,
                credits,
                semester
            }
        });
        return Course.mapToCourse(coursePrisma);
    } catch (error) {
        console.error(error)
        throw new Error('DB Error')
    }
}

const getAllCourses = async (): Promise<Course[]> => {
    try {
      const coursePrisma = await database.course.findMany({
        select: {
          id: true,
          name: true,
          semester:true,
          credits:true
        }
      });
      return Course.mapToCourses(coursePrisma);
    } catch (error) {
      console.error(error);
      throw new Error('DB Error');
    }
  };


  export default {getAllCourses,addCourse}

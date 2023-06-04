import {  PrismaClient } from "@prisma/client";
import { Student } from "../model/student";
import { User } from "../model/user";
import { Enrollment } from "../model/enrollment";
import { Course } from "../model/course";


let currentId =  1;
const database = new PrismaClient()

const enrollStudentToCourse = async ({ studentId,courseId,location}:{studentId:number,courseId:number,location:string}): Promise<Enrollment> => {
    try {
        const enrollmentPrisma = await database.enrollment.create({
            data: {
                studentId,
                courseId,
                location
            }
        });

        const student = await database.student.findFirst({
            where: {
                id: enrollmentPrisma.studentId,
            },
        });

        const course = await database.course.findFirst({
            where: {
                id: enrollmentPrisma.courseId,
            },
        });

        const user = await database.user.findFirst({
            where: {
                id: student.userId,
            },
        });
        const usertje = User.mapToUser(user);

        const coursje = new Course({id:course.id,name:course.name,credits:course.credits,semester:course.semester});
        const studentje = new Student({id:student.id,study:student.study,user:usertje,createdAt:student.createdAt});

        await database.course.update({
            where: {
              id: course.id,
            },
            data: {
              enrollments: {
                connect: {
                  id: enrollmentPrisma.id,
                },
              },
            },
          });

          await database.student.update({
            where: {
              id: student.id,
            },
            data: {
              enrollments: {
                connect: {
                  id: enrollmentPrisma.id,
                },
              },
            },
          });

        return new Enrollment({id:enrollmentPrisma.id,student:studentje,course:coursje,startDate:enrollmentPrisma.startDate,location:enrollmentPrisma.location});
    } catch (error) {
        console.error(error)
        throw new Error('DB Error')
    }
}

export default {enrollStudentToCourse}



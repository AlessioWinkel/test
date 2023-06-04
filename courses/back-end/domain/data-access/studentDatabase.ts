import { PrismaClient } from "@prisma/client";
import { Student } from "../model/student";
import { User } from "../model/user";
import { Enrollment } from "../model/enrollment";
import { Course } from "../model/course";


let currentId =  1;
const database = new PrismaClient()

const addStudent = async ({ userId,study}:
    {    userId: number,
        study: string}): Promise<Student> => {
    try {
        const studentPrisma = await database.student.create({
            data: {
                userId,
                study
            }
        });

        const user = await database.user.findFirst({
          where: {
              id: studentPrisma.userId,
          },
      });
      const usertje = User.mapToUser(user);
        
        return new Student({study:studentPrisma.study,user:usertje,createdAt:studentPrisma.createdAt})
    } catch (error) {
        console.error(error)
        throw new Error('DB Error')
    }

    
}

const getAllStudents = async (): Promise<Student[]> => {
  try {
    const studentsPrisma = await database.student.findMany();
    const enrollmentsPrisma = await database.enrollment.findMany();
    const students: Student[] = [];
    for (const studentPrisma of studentsPrisma) {
      const userPrisma = await database.user.findUnique({
        where: {
          id: studentPrisma.userId,
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

      const enrollments: Enrollment[] = [];
      for (const enrollmentPrisma of enrollmentsPrisma) {
        const coursePrisma = await database.course.findUnique({
          where: {
            id: enrollmentPrisma.courseId,
          },
        });

        const course = new Course({
          id: coursePrisma.id,
          name: coursePrisma.name,
          credits: coursePrisma.credits,
          semester: coursePrisma.semester,
        });

        const student2 = new Student({
          id: studentPrisma.id,
          user: user,
          study: studentPrisma.study,
          createdAt: studentPrisma.createdAt
        });

        const enrollment = new Enrollment({
          id: enrollmentPrisma.id,
          student: student2,
          course: course,
          startDate: enrollmentPrisma.startDate,
          location: enrollmentPrisma.location,
        });

        enrollments.push(enrollment);
      }

      const student = new Student({
        id: studentPrisma.id,
        user: user,
        study: studentPrisma.study,
        createdAt: studentPrisma.createdAt,
        enrollments: enrollments
      });

      

      students.push(student);
    }

    return students;
  } catch (error) {
    console.error(error);
    throw new Error('DB Error');
  }
};


  export default {getAllStudents,addStudent};
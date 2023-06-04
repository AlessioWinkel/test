import database from "../../util/database";
import { Course } from "./course";
import { Student } from "./student";
import { Enrollment as EnrollmentPrisma, Student as StudentPrisma, Course as CoursePrisma } from '@prisma/client';
import { User } from "./user";


export class Enrollment {
    readonly id:number
    readonly student: Student
    readonly course: Course
    readonly startDate: Date
    readonly location: string


    constructor(enrollment: {
        id: number;
        student: Student;
        course: Course;
        startDate: Date;
        location: string;
    }) {
        this.id=enrollment.id;
        this.student = enrollment.student;
        this.course = enrollment.course;
        this.startDate = enrollment.startDate;
        this.location = enrollment.location;

    }


    static async from({
        id,
        student,
        course,
        startDate,
        location,
    }: EnrollmentPrisma & { student: StudentPrisma } & {course: CoursePrisma}) {
        const user = await database.user.findFirst({
            where: {
                id: student.userId,
            },
        });
        const usertje = User.mapToUser(user);

        return new Enrollment({
            id,
            student: new Student({id:student.id,study:student.study,user:usertje,createdAt:student.createdAt}),
            course:Course.from(course),
            startDate,
            location,
        });
    }
}
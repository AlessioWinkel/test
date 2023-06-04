import { Enrollment } from "./enrollment"
import { Enrollment as EnrollmentPrisma,User as UserPrisma , Student as StudentPrisma, Course as CoursePrisma } from '@prisma/client';
import { User } from "./user";


export class Student {
    readonly id: number
    readonly study: string
    readonly createdAt: Date
    readonly user:User
    readonly enrollments?: Enrollment[]


    constructor(student:{
        id?:number;
        study:string;
        user: User;
        createdAt:Date;
        enrollments?:Enrollment[];
    }) {
        this.id = student.id;
        this.study=student.study;
        this.user = student.user
        this.createdAt=student.createdAt;
        this.enrollments=student.enrollments;
    }
    





    static from({
        id,
        study,
        user,
        createdAt
    }: StudentPrisma & { user: UserPrisma }) {
        return new Student({
            id,
            user: User.from(user),
            study,
            createdAt
        });
    }
}
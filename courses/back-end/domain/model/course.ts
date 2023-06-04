import { Enrollment } from "./enrollment"
import { Lecturer } from "./lecturer"
import { Enrollment as EnrollmentPrisma, Student as StudentPrisma, Course as CoursePrisma } from '@prisma/client';


export class Course {
    readonly id: number
    readonly name: string
    readonly credits: number
    readonly semester: number
    readonly enrollments: Enrollment[]
    readonly lecturers: Lecturer[]


    constructor(course: {
        id?: number;
        name: string;
        credits: number;
        semester: number;
        enrollments?: Enrollment[];
        lecturers?: Lecturer[];
    }) {
        this.id = course.id;
        this.name = course.name;
        this.credits = course.credits;
        this.semester = course.semester;
        this.enrollments = course.enrollments;
        this.lecturers = course.lecturers;
    }

    static mapToCourse = ({id, name,credits,semester}: CoursePrisma): Course =>
    new Course({id,name,credits,semester});


    static mapToCourses = ( userPrisma: CoursePrisma[]): Course[] =>
    userPrisma.map(Course.mapToCourse)

    static from({
        id,
        name,
        credits,
        semester,
    }: CoursePrisma) {
        return new Course({
            id,
            name,
            credits,
            semester
        });
    }

}


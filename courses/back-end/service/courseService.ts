import courseDatabase from "../domain/data-access/courseDatabase";
import { Course } from "../domain/model/course";
import { CourseInput } from "../types/CourseInput";


const getAllCourses = async (): Promise<Course[]> => courseDatabase.getAllCourses();


const addCourse =async ({name,semester,credits}: CourseInput): Promise<Course> => {


    return await courseDatabase.addCourse({
        name: name,
        semester:semester,
        credits:credits
    })
}

export default {getAllCourses,addCourse}
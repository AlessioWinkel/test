import enrollmentDatabase from "../domain/data-access/enrollmentDatabase"
import { Enrollment } from "../domain/model/enrollment"
import { EnrollmentInput } from "../types/EnrollmentInput"


const enrollStudentToCourse =async ({studentId,courseId,location}: EnrollmentInput): Promise<Enrollment> => {


    return await enrollmentDatabase.enrollStudentToCourse({
        studentId: studentId,
        courseId:courseId,
        location:location
    })
}

export default {enrollStudentToCourse}
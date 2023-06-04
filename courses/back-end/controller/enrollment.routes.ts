/**
 * @swagger
 * components:
 *  schemas:
 *    Enrollment:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: ID of the enrollment
 *          format: number
 *        student:
 *          type: Student
 *          description: student that enrolled into the course
 *          format: number
 *        course:
 *          type: Course
 *          description: course of the enrollment
 *        location:
 *          type: strong
 *          description: school where the course is given
 *    EnrollmentInput:
 *        type: object
 *        properties:
 *          studentId:
 *            type: number
 *            description: student id of the student that enrolled into the course
 *            format: number
 *          courseId:
 *            type: number
 *            description: course id of the course
 *            format: number
 *          location:
 *            type: string
 *            description: school where the course is given
 */


import userService from "../service/userService";
import express, { Request, Response } from 'express'
import { UserInput } from "../types/UserInput";
import { LoginInput } from "../types/LoginInput";
import courseService from "../service/courseService";
import { CourseInput } from "../types/CourseInput";
import { EnrollmentInput } from "../types/EnrollmentInput";
import enrollmentService from "../service/enrollmentService";


export const enrollmentRouter = express.Router();


/**
 * @swagger
 * /enrollments/enroll:
 *      post:
 *          summary: enroll a student into a course
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/EnrollmentInput'
 *          responses:
 *              200:
 *                  description: Adds a user
 *                  content:
 *                    application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/Enrollment'
 *                  
 */
enrollmentRouter.post('/enroll', async (req: Request, res: Response) => {
    const EnrollmentInput = <EnrollmentInput>req.body;
    try{
        const enrollment = await enrollmentService.enrollStudentToCourse(EnrollmentInput);
        res.status(200).json(enrollment)  
    }catch(error){
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})
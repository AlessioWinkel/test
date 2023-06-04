/**
 * @swagger
 * components:
 *  schemas:
 *    Course:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: ID of the user
 *          format: number
 *        name:
 *          type: string
 *          description: Name for the course.
 *        semester:
 *          type: number
 *          description: semester of the course
 *          format: number
 *        credits:
 *          type: number
 *          description: credits of the course
 *          format: number
 *        enrollments:
 *          type: array
 *          description: All the enrollments that this course has
 *          items:
 *              $ref: '#/components/schemas/Enrollment'
 *    CourseInput:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: username of user
 *          semester:
 *            type: number
 *            description: semester of the course
 *            format: number
 *          credits:
 *            type: number
 *            description: credits of the course
 *            format: number
 */


import userService from "../service/userService";
import express, { Request, Response } from 'express'
import { UserInput } from "../types/UserInput";
import { LoginInput } from "../types/LoginInput";
import courseService from "../service/courseService";
import { CourseInput } from "../types/CourseInput";


export const courseRouter = express.Router();


/**
 * @swagger
 * /courses:
 *      get:
 *          summary: Get all courses
 *          security:
 *            - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Returns all users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Course'
 */
courseRouter.get('/', async (req: Request, res: Response) => {
    try{
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses) 
    }catch(error){
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


/**
 * @swagger
 * /courses/add:
 *      post:
 *          summary: Add course
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/CourseInput'
 *          responses:
 *              200:
 *                  description: Adds a course
 *                  content:
 *                    application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/Course'
 *                  
 */
courseRouter.post('/add', async (req: Request, res: Response) => {
    const CourseInput = <CourseInput>req.body;
    try{
        const user = await courseService.addCourse(CourseInput);
        res.status(200).json(user)  
    }catch(error){
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})
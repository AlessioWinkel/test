/**
 * @swagger
 * components:
 *  schemas:
 *    Student:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID of the student.
 *           format: number
 *         study:
 *           type: string
 *           description: study of this student.
 *         createdAt:
 *           type: string
 *           description: creation time of the student
 *         enrollments:
 *           type: array
 *           description: All the enrollments that this student has
 *           items:
 *               $ref: '#/components/schemas/Enrollment'
 *    StudentInput:
 *        type: object
 *        properties:
 *          userId:
 *            type: number
 *            format: number
 *          study:
 *            type: string
 *            description: study of user
 */


import express, { Request, Response } from 'express'
import { StudentInput } from "../types/StudentInput";
import StudentService from '../service/studentService';


export const studentRouter = express.Router();


/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       201:
 *         description: New student created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
studentRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, study } = req.body as StudentInput;

    const newStudent = await StudentService.addStudent({ userId, study });

    res.status(200).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
* @swagger
* /students:
*   get:
*     summary: Get all students
*     responses:
*       '200':
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Student'
*       '500':
*         description: Internal server error
*/
studentRouter.get('/', async (req: Request, res: Response) => {
  try {
    const students = await StudentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

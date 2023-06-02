/**
 * @swagger
 * components:
 *  schemas:
 *    Lecturer:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: ID of the user
 *          format: number
 *        user:
 *          type: User
 *          description: user account of the lecturer.
 *        expertise:
 *          type: string
 *          description: First name of the user.
 *        createdAt:
 *          type: string
 *          description: creation time of the lecturer
 *        updatedAt:
 *          type: string
 *          description: last time when lecturer was last updated.
 *    LecturerInput:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            description: ID of the user
 *            format: number
 *          userId:
 *            type: number
 *            description: user account of the lecturer.
 *          expertise:
 *            type: string
 *            description: First name of the user.
 */

import express, { Request, Response } from 'express'
import { LecturerInput } from "../types/LecturerInput";
import lecturerDatabase from '../domain/data-access/lecturerDatabase';
import LecturerService from '../service/lecturerService';


export const lecturerRouter = express.Router();

/**
 * @swagger
 * /lecturers:
 *   post:
 *     summary: Create a new lecturer
 *     tags:
 *       - Lecturers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LecturerInput'
 *     responses:
 *       201:
 *         description: New lecturer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lecturer'
 *       500:
 *         description: Internal server error
 */
lecturerRouter.post('/', async (req: Request, res: Response) => {
    try {
      const { userId, expertise } = req.body as LecturerInput;
  
      // Call the addLecturer function from the database layer
      const newLecturer = await LecturerService.addLecturer({ userId, expertise });
  
      res.status(201).json(newLecturer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  /**
 * @swagger
 * /lecturers:
 *   get:
 *     summary: Get all lecturers
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lecturer'
 *       '500':
 *         description: Internal server error
 */
lecturerRouter.get('/', async (req: Request, res: Response) => {
    try {
      const lecturers = await LecturerService.getAllLecturers();
      res.status(200).json(lecturers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
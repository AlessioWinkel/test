/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: ID of the user
 *          format: number
 *        username:
 *          type: string
 *          description: Name for the user.
 *        firstName:
 *          type: string
 *          description: First name of the user.
 *        lastName:
 *          type: string
 *          description: Last name of the user.
 *        email:
 *          type: string
 *          description: Email for the user.
 *        password:
 *          type: string
 *          description: Password for the user.
 *    UserInput:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *          username:
 *            type: string
 *            description: username of user
 *          firstName:
 *            type: string
 *            description: First name of the user.
 *          lastName:
 *            type: string
 *            description: Last name of the user.
 *          email:
 *            type: string
 *            description: email of user
 *          password:
 *            type: string
 *            description: password for the user
 */


import userService from "../service/userService";
import express, { Request, Response } from 'express'
import { UserInput } from "../types/UserInput";
import { LoginInput } from "../types/LoginInput";


export const userRouter = express.Router();


/**
 * @swagger
 * /users:
 *      get:
 *          summary: Get all Users
 *          security:
 *            - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Returns all users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users) 
    }catch(error){
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


/**
 * @swagger
 * /users/signup:
 *      post:
 *          summary: Add User
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UserInput'
 *          responses:
 *              200:
 *                  description: Adds a user
 *                  content:
 *                    application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/User'
 *                  
 */
userRouter.post('/signup', async (req: Request, res: Response) => {
    const UserInput = <UserInput>req.body;
    try{
        const user = await userService.addUser(UserInput);
        res.status(200).json(user)  
    }catch(error){
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticates a user
 *     requestBody:
 *       description: The user credentials to authenticate
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try{
        const userInput = <UserInput>req.body;
        const token = await userService.authenticatie(userInput);
        res.status(200).json({message: 'Authenticatie succesfull', token})
    } catch(error){
        res.status(401).json({status: 'unathorized', errorMessage: error.message})
    }
});

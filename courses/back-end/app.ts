import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import { userRouter } from './controller/user.routes';
import { lecturerRouter } from './controller/lecturer.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;


app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Whatt API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

app.use(
    expressjwt({secret: jwtSecret, algorithms: ['HS256']}).unless({
    path:[/^\/api-docs\/.*/, '/users/login', '/users/signup', '/status']
    })
  )

app.use('/users', userRouter)
app.use('/lecturers', lecturerRouter)



const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: error.message });
    } else {
        next();
    }
});

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});

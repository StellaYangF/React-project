import express, { Express, Request, Response, NextFunction} from 'express';
import mongoose, { mongo } from 'mongoose';
import HttpException from './exceptions/HttpException';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middlewares/errorMiddleware';
import * as userController from './controller/user';
import 'dotenv/config';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.join('public', 'uploads'),
    filename(_req: Request, file:Express.Multer.File, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
})
const upload = multer({ storage });
const app: Express = express();
// middleware register
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
// route
app.get('/user/validate', userController.validate);
app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
app.post(
    '/user/uploadAvatar',
    upload.single('avatar'),
    userController.uploadAvatar,
);
// middleware register
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error: HttpException = new HttpException(404, 'Route not found');
    next(error);
});
app.use(errorMiddleware);
const PORT: number = (process.env.PORT && parseInt(process.env.PORT))|| 8000;
(async function() {
    mongoose.set('useNewUrlParser', true),
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect('mongodb://localhost:27017/react-project');
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
})();

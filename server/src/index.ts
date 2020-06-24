import express, { Express, Request, Response, NextFunction} from 'express';
import mongoose, { mongo } from 'mongoose';
import HttpException from './exceptions/HttpException';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import errorMiddleware from './middlewares/errorMiddleware';
import * as userController from './controller/user';
import * as sliderController from './controller/slider';
import 'dotenv/config';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import { Slider } from './models/slider';

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
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public/')));
// route
app.get('/user/validate', userController.validate);
app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
app.post(
    '/user/uploadAvatar',
    upload.single('avatar'),
    userController.uploadAvatar,
);
app.get('/slider/list', sliderController.list);
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
    await mongoose.connect(process.env.MONGO_PATH!);
    await createSliders();
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
})();

async function createSliders() {
  const sliders = await Slider.find();
  if (!sliders.length) {
    const sliders: any = [
      { url: 'http://exjhn.com/webpages/static/images/reg/login_left.jpg' },
      { url: 'http://img.12316hb.com/img/hbynw/website/61e4b8c35b4846bcb7b512498431cdfb.jpg' },
      { url: 'http://a3.att.hudong.com/13/41/01300000201800122190411861466.jpg' }
    ];
    Slider.create(sliders);
  };
}

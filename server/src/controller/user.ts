import { Request, Response, NextFunction } from 'express';
import {validateRegisterInput} from '../utils/validator';
import HttpException from '../exceptions/HttpException';
import { UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { User, IUserDocument } from '../models/index';
import { UserPayload } from '../typings/jwt';
import jwt from 'jsonwebtoken';

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split(' ')[1];
        if (token) {
            try {
                const payload: UserPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;
                const user = await User.findById(payload.id);
                if (user) {
                    delete user.password;
                    res.json({
                        success: true,
                        data: user,
                    })
                } else {
                    next(new HttpException(UNAUTHORIZED, '用户不合！'));
                }
            } catch (error) {
                next(new HttpException(UNAUTHORIZED, 'token 不合法！'));
            }
        } else {
            next(new HttpException(UNAUTHORIZED, 'token 未提供！'));
        }
    } else {
        next(new HttpException(UNAUTHORIZED, 'authorization 未提供！'));
    }
};

export const register = async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, 'req.body');
    try {
        let { username, password, confirmPassword, email, addresses } = req.body;    
        const { valid, errors } = validateRegisterInput(username, password, confirmPassword, email);
        if (!valid) {
            throw new HttpException(UNPROCESSABLE_ENTITY, '参数验证失败！', errors);
        }
        let user: IUserDocument = new User({
            username,
            email,
            password,
            addresses,
        });
        let oldUser: IUserDocument | null = await User.findOne({ username: user.username });
        if (oldUser) {
            throw new HttpException(UNPROCESSABLE_ENTITY, '用户名重复！');
        }
        await user.save();
        let token = user.generateToken();
        res.json({
            success: true,
            data: {
                token,
            }
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { username, password } = req.body;
        let user = await User.login(username, password);
        if (user) {
            let token = user.generateToken();
            res.json({
                success: true,
                data: {
                    token,
                }
            })
        } else {
            throw new HttpException(UNAUTHORIZED, '登陆失败');
        }
    } catch (error) {
        next(error);
    }
};

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    let { userId } = req.body;
    console.log(req.body);
    let domain = process.env.DOMAIN || `${req.protocol}://${req.headers.host}`;
    let avatar = `${domain}/uploads/${req.file.filename}`;
    await User.updateOne({ _id: userId }, { avatar });
    res.send({
        success: true,
        data: avatar,
    })
};

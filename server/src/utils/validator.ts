import validator from 'validator';
import { IUserDocument } from '../models/user';

export interface RegisterInput extends Partial<IUserDocument> {
    confirmPassword?: string;
}

export interface RegisterInputValidateResult {
    errors: RegisterInput;
    valid: boolean;
}

export const validateRegisterInput = (
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
): RegisterInputValidateResult => {
    let errors: RegisterInput = {};
    if (username == undefined || validator.isEmpty(username)) {
        errors.username = '用户名不能为空';
    }
    if (password == undefined || validator.isEmpty(password)) {
        errors.password = '密码不能为空';
    }
    if (confirmPassword == undefined || validator.isEmpty(confirmPassword)) {
        errors.confirmPassword = ' 确认密码不能为空';
    }
    if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = '确认密码和密码不想等';
    }
    if (!validator.isEmail(email)) {
        errors.email = '邮箱密码必须合法';
    }
    return { errors, valid: Object.keys(errors).length == 0 };
}
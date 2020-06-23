import { AnyAction } from 'redux';
import { VALIDATE, LOGOUT, CHANGE_AVATAR } from '../action-types';
import { validate, register, login } from '../../api/profile';
import { push } from 'connected-react-router';
import { RegisterPayload, RegisterResult, LoginPayload, LoginResult } from '@/typings/user';
import { message } from 'antd';

export default {
    validate(): AnyAction{
        return {
            type: VALIDATE,
            payload: validate(),
        }
    },

    register(values: RegisterPayload) {
      return function(dispatch: any) {
        (async function() {
          try {
            let result: RegisterResult = await register<RegisterResult>(values);
            if (result.success) {
              dispatch(push('/login'));
            } else {
              message.error(result.message);
            }
          } catch (error) {
            message.error('注册失败！')
          }
        })();
      }
    },

    login(values: LoginPayload) {
      return function (dispatch:any) {
        (async () => {
          try {
            let result:LoginResult = await login<LoginResult>(values);
            if (result.success) {
              sessionStorage.setItem('access_token', result.data.token);
              dispatch(push('/profile'));
            } else {
              message.error(result.message);
            }
          } catch (error) {
            message.error('登陆失败')
          }
        })()
      }
    },

    logout() {
      return function(dispatch:any) {
        sessionStorage.removeItem('access_token');
        dispatch({ type: LOGOUT });
        dispatch(push('/login'));
      }
    },

    changeAvatar(avatar: string) { {
      return {
        type: CHANGE_AVATAR,
        payload: avatar,
      }
    }

    }
};

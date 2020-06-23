import {AnyAction} from 'redux';
import { VALIDATE, LOGOUT, CHANGE_AVATAR } from '../action-types';
import LOGIN_TYPES from '../../typings/login-types';
export interface ProfileState {
    loginState: LOGIN_TYPES;
    user: any;
    error: string | null;
}

let initialState: ProfileState = {
    loginState: LOGIN_TYPES.UN_VALIDATE,
    user: null,
    error: null,
};

export default function(state: ProfileState = initialState, action: AnyAction): ProfileState {
    switch(action.type) {
        case VALIDATE:
            if (action.payload.success) {
                return {
                    ...state,
                    loginState: LOGIN_TYPES.LOGINED,
                    user: action.payload.data,
                    error: null,
                }
            }else {
                return {
                    ...state,
                    loginState: LOGIN_TYPES.UNLOGIN,
                    user: action.payload.data,
                    error: null,
                }
            }
        case LOGOUT:
          return {
            ...state,
            loginState: LOGIN_TYPES.UN_VALIDATE,
            user: null,
            error: null,
          }
        case CHANGE_AVATAR:
          return {
            ...state,
            user: {
              ...state.user,
              avatar: action.payload,
            }
          }
        default: 
            return state;
    }
}

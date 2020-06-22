import { AnyAction } from 'redux';
import { VALIDATE } from '../action-types';
import { validate } from '../../api/profile';

export default {
    validate(): AnyAction{
        return {
            type: VALIDATE,
            payload: validate(),
        }
    }
};

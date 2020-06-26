import { ADD_CART_ITEM, REMOVE_CART_ITEM, CLEAR_CART_ITEMS, CHANGE_CART_ITEM_COUNT, SETTLE, CHANGE_CHECKED_CART_ITEMS } from '../action-types';
import Lesson from '@/typings/lesson';
import { message } from 'antd';
import { push } from 'connected-react-router';
import { StoreDispatch, StoreGetState } from '..';

export default {
    addCartItem(lesson: Lesson) {
        return function(dispatch: StoreDispatch) {
            dispatch({
                type: ADD_CART_ITEM,
                payload: lesson,
            });
            message.info('添加课程成功！');
        };
    },
    removeCartItem(id: string) {
        return {
            type: REMOVE_CART_ITEM,
            payload: id,
        };
    },
    clearItems() {
        return {
            type: CLEAR_CART_ITEMS,
        };
    },
    changeCartItemCount(id: string, count: number) {
        return {
            type: CHANGE_CART_ITEM_COUNT,
            payload: {
                id,
                count,
            },
        };
    },
    changeCheckedCartItems(checkedIds: string[]){
        return {
            type: CHANGE_CHECKED_CART_ITEMS,
            payload: checkedIds,
        }
    },
    settle() {
        return function(dispatch: StoreDispatch, getState: StoreGetState) {
            dispatch({
                type: SETTLE,
            });
            dispatch(push('/'));
        }
    }
}
import {AnyAction} from 'redux';
import { SET_CURRENT_CATEGORY, GET_SLIDERS } from '../action-types';
import { Slider } from '@/typings/slider';

export interface HomeState {
    currentCategory: string;
    sliders: Slider[];
}

let initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
};

export default function(state: HomeState = initialState, action: AnyAction):HomeState {
    switch (action.type) {
        case SET_CURRENT_CATEGORY:
          return { ...state, currentCategory: action.payload };
        case GET_SLIDERS:
          return { ...state, sliders: action.payload.data };
        default:
          return state;
    }
}
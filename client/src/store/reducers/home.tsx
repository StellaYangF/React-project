import {AnyAction} from 'redux';
import { SET_CURRENT_CATEGORY, GET_SLIDERS, SET_LESSONS_LOADING, SET_LESSONS, REFRESH_LESSONS } from '../action-types';
import { Slider } from '@/typings/slider';
import Lesson from '@/typings/login-types';

export interface HomeState {
    currentCategory: string;
    sliders: Slider[];
    lessons: Lessons;
}

export interface Lessons {
  loading: boolean;
  list: Lesson[];
  hasMore: boolean;
  offset: number;
  limit: number;
}

let initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
      loading: false,
      list: [],
      hasMore: true,
      offset: 0,
      limit: 5,
    },
};


export default function(state: HomeState = initialState, action: AnyAction):HomeState {
    switch (action.type) {
        case SET_CURRENT_CATEGORY:
          return { ...state, currentCategory: action.payload };
        case GET_SLIDERS:
          return { ...state, sliders: action.payload.data };
        case SET_LESSONS_LOADING:
          return  { 
            ...state,
            lessons: {
              ...state.lessons,
              loading: action.payload,
            }
           };
        case SET_LESSONS:
          return {
            ...state,
            lessons: {
              ...state.lessons,
              loading: false,
              hasMore: action.payload.hasMore,
              list: [
                ...state.lessons.list, ...action.payload.list,
              ],
              offset: state.lessons.offset + action.payload.list.length,
            }
          };
        case REFRESH_LESSONS:
          return {
            ...state,
            lessons: {
              ...state.lessons,
              loading: false,
              hasMore: action.payload.hasMore,
              list: action.payload.list,
              offset: action.payload.list.length,
            }
          }
        default:
          return state;
    }
}
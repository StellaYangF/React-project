import { SET_CURRENT_CATEGORY, GET_SLIDERS, SET_LESSONS_LOADING, SET_LESSONS, REFRESH_LESSONS } from '../action-types';
import { getSliders, getLessons } from '@/api/home';

export default {
    setCurrentCategory(currentCategory:string) {
      return {
        type: SET_CURRENT_CATEGORY,
        payload: currentCategory,
      }
    },
    getSliders() {
      return {
        type: GET_SLIDERS,
        payload: getSliders(),
      }
    },
    getLessons() {
      return (dispatch: any, getState: any) => {
        (async function() {
          let {
            currentCategory,
            lessons: { hasMore, offset, limit, loading },
          } = getState().home;
          if (hasMore && !loading) {
            dispatch({ type: SET_LESSONS_LOADING, payload: true });
            let result = await getLessons(currentCategory, offset, limit);
            dispatch({ type: SET_LESSONS, payload: result.data });
          }
        })
      }
    },
    refreshLessons() {
      return (dispatch: any, getState: any) => {
        (async function() {
          let {
            currentCategory,
            lessons: { limit, loading },
          } = getState().home;
          if (!loading) {
            dispatch({ type: SET_LESSONS_LOADING, payload: true });
            let result = await getLessons(currentCategory, 0, limit);
            dispatch({ type: REFRESH_LESSONS, payload: result.data });
          }
        })
      }
    }
};

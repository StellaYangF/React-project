import { SET_CURRENT_CATEGORY, GET_SLIDERS } from '../action-types';
import { getSliders } from '@/api/home';

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
    }
};

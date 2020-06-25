import axios from './index';

export function  getSliders() {
  return axios.get('/slider/list');
}

export function getLessons(
  category: string = 'all',
  offset: number,
  limit: number,
) {
  return axios.get('/lesson/list',{
    params: {
      category,
      offset,
      limit,
    }
  });
}
import { CREATE_CONFESSION, SET_CATEGORY_FILTER } from "./actionTypes/index";

export const createConfession = confession => {
  return {
    type: CREATE_CONFESSION,
    payload: {
      confession
    }
  };
};

export const setCategoryFilter = category => {
  return {
    type: SET_CATEGORY_FILTER,
    payload: {
      filterCategory: category
    }
  };
};

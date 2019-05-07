import { CREATE_CONFESSION } from "./actionTypes/index";

export const createConfession = confession => {
  return {
    type: CREATE_CONFESSION,
    payload: {
      confession
    }
  };
};

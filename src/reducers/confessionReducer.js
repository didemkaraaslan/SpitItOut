import { SET_CATEGORY_FILTER } from "../actions/actionTypes/index";
import { ALL } from "../../src/utils/Tags";

function confessionReducer(state = { filterCategory: ALL }, action) {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return Object.assign({}, state, {
        filterCategory: action.payload.filterCategory
      });
    default:
      return state;
  }
}

export default confessionReducer;

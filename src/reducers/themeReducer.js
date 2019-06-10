import { SET_THEME } from "../actions/actionTypes/index";
import { themes } from "../utils/Theme";

const initialState = {
  theme: themes.light
};

function themeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return Object.assign({}, state, {
        theme: action.payload.theme
      });
    default:
      return state;
  }
}

export default themeReducer;

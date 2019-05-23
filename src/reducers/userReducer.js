import { SET_USER } from "../actions/actionTypes/index";

const initialUserState = {
  currentUser: null,
  isLoading: true
};

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        currentUser: action.payload.currentUser,
        isLoading: false
      });
    default:
      return state;
  }
}

export default userReducer;

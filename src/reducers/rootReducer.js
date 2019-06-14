import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import confessionReducer from "./confessionReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  confession: confessionReducer,
  user: userReducer
});

export default rootReducer;

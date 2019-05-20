import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import confessionReducer from "./confessionReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  confession: confessionReducer
});

export default rootReducer;

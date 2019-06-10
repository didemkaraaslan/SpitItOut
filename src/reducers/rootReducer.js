import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import confessionReducer from "./confessionReducer";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  confession: confessionReducer,
  user: userReducer,
  theme: themeReducer
});

export default rootReducer;

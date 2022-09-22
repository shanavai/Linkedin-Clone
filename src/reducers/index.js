import { combineReducers } from "redux";

import userReducer from './userReducer';
import postReducer from "./postReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    postReducer: postReducer
});

export default rootReducer;

import userReducer from "./user";
import { combineReducers } from "redux";
import taskReducer from "./task";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
    auth: authReducer
})
export default rootReducer
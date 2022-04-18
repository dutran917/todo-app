import userReducer from "./user";
import { combineReducers } from "redux";
import taskReducer from "./task";
import { pageReducer } from "./page";

const rootReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
    page: pageReducer
})
export default rootReducer
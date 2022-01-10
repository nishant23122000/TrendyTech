import { combineReducers } from "redux";
import bucketReducer from "./bucketReducer";
import taskReducer from "./taskReducer";


export default combineReducers({
    bucket: bucketReducer,
    task: taskReducer
})
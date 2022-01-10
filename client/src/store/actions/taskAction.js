import axios from "../../utils/axios";
import { GET_TASKS } from "./actionType";

export const getTasksByBucketId = (bucketid) => async dispatch => {
    try {
        let result = await axios.get("/tasks/" + bucketid);
        dispatch({ type: GET_TASKS, payload: result.data });

    } catch (e) {

    }
}

export const addTask = (task, bucketid, onClose) => async dispatch => {


    try {
        await axios.post("/add-task", {
            ...task, bucketid
        });
        dispatch(getTasksByBucketId(bucketid));
        onClose();
        // console.log(res);
    } catch (e) {

    }
}

export const deleteTask = (taskId, bucketId) => async dispatch => {
    try {

        await axios.delete("/task/" + taskId);
        dispatch(getTasksByBucketId(bucketId));
    } catch (e) {

    }
}

export const updateTaskStatus = (taskId, bucketId, isComplete) => async dispatch => {

    try {

        await axios.post("/update-status/" + taskId, {
            isComplete
        });
        dispatch(getTasksByBucketId(bucketId));
    } catch (e) {

    }
}

export const updateTask = (task, bucketid, onClose) => async dispatch => {

    try {
        await axios.post("/update-task/" + task._id, {
            name: task.name,
            description: task.description,
        })
        dispatch(getTasksByBucketId(bucketid));
        onClose();
    } catch (e) {

    }
}
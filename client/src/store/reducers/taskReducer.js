const { ADD_TASK, GET_TASKS } = require("../actions/actionType")




const initailState = {
    tasks: [],
}

const taskReducer = (state = initailState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            }
        default:
            return state
    }
}

export default taskReducer;
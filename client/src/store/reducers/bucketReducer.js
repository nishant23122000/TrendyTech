import { ADD_CURRENT_BUCKET, GET_BUCKETS } from "../actions/actionType";



const intialState = {
    buckets: [],
    currentBucket: null,
}


const bucketReducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_BUCKETS:
            return {
                ...state,
                buckets: action.payload,
                currentBucket: action.payload.length ? action.payload[0] : null
            }
        case ADD_CURRENT_BUCKET:
            return {
                ...state,
                currentBucket: action.payload
            }
        default:
            return state
    }
}

export default bucketReducer;
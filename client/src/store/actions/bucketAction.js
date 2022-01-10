import axios from "../../utils/axios";
import { GET_BUCKETS } from "./actionType";


export const getBuckets=()=>async dispatch=>{
    try{
        let result=await axios.get("/buckets");
        dispatch({type:GET_BUCKETS,payload:result.data})
    }catch(e){

    }
}

export const addBucket=(name,onclose)=>async dispatch=>{
    
    try{
            await axios.post("/add-bucket",{
                name
            })
            dispatch(getBuckets());
            onclose();
    }catch(e){

    }
}
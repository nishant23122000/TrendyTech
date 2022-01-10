const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const taskSchema=Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    isComplete:{
        type:Boolean,
    },
    bucketid:{
        type:Schema.Types.ObjectId,
        ref:'Bucket'
    }
},{
    timestamps: { date: () => Math.floor(Date.now() / 1000) }
})

module.exports=mongoose.model("task",taskSchema);
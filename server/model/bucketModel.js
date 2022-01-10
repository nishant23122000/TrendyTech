const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const bucketSchema=Schema({
    name:{
        type:String,
        required:true
    },
},{
    timestamps: { date: () => Math.floor(Date.now() / 1000) }
})

module.exports=mongoose.model("bucket",bucketSchema);
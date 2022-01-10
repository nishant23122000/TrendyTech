const Task=require("../model/taskModel");


exports.setupTask=async (req,res,next)=>{
    const name=req.body.name;
    const description=req.body.description;
    const bucketid=req.body.bucketid;
    let task=new Task({
        name,
        description,
        bucketid,
        isComplete:false
    })
   try{
    let data=await task.save();

    res.status(200).send({
        _id:data._id,
        name:data.name,
        description:description,
        bucketid:data.bucketid,
        date:new Date(data.createdAt).toLocaleString()
    })
   }catch(e){
       res.status(404).send({
           message:"Please try again later."
       })
   }
  
  

}



exports.getTasksByBucketId=async(req,res)=>{
    try{
        let data=await Task.find({bucketid:req.params.bucketid},"-updatedAt -__v");
        res.status(200).send(data)
    }catch(e){
        res.status(404).send({
            message:"Please try again later."
        })
    }
    
}

exports.deleteTaskByTaskId=async(req,res)=>{
    try{
        let data=await Task.findByIdAndDelete({_id:req.params.taskid});
        res.status(200).send(data)
    }catch(e){
        res.status(404).send({
            message:"Please try again later."
        })
    }
    
}
exports.patchTaskByTaskId=async(req,res)=>{
    try{

        let data=await Task.findOneAndUpdate({_id:req.params.taskid},{
            name:req.body.name ,
            description:req.body.description
        });
        

        
        res.status(200).send(data)
    }catch(e){
        
        res.status(404).send({
            message:"please try again later"
        })
    }
    
}

exports.updateTaskStatus=async(req,res)=>{
    try{

        let data=await Task.findOneAndUpdate({_id:req.params.taskid},{
            isComplete:req.body.isComplete,
        });
        

        
        res.status(200).send(data)
    }catch(e){
        
        res.status(404).send({
            message:"please try again later"
        })
    }
    
}


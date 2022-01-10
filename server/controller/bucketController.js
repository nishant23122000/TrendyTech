const Bucket=require("../model/bucketModel");


exports.setupBucket=async (req,res,next)=>{
    const name=req.body.name;
   
    let bucket=new Bucket({
        name,
      
    })
   try{
    let data=await bucket.save();
    
    res.status(200).send({
        _id:data._id,
        name:data.name,
        date:new Date(data.createdAt).toLocaleString()
    })
   }catch(e){
       res.status(404).send({
           message:"Please try again later."
       })
   }
  
  

}
exports.getBuckets=async(req,res)=>{
    try{
        let data=await Bucket.find({},"-updatedAt -__v");
        res.status(200).send(data)
    }catch(e){
        res.status(404).send({
            message:"Please try again later."
        })
    }
    
}
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const {MongoClient}=require("mongodb");
const mongoose=require("mongoose");
const app=express();
const mainRouter=require('./routes/mainRouter');


app.use(cors({origin:"*"}));
app.use(bodyParser.json());


app.use('/',mainRouter);

// app.use(express.static(__dirname+'/dist/client')).use((req,res)=>{
//     res.sendFile(__dirname+'/dist/client/index.html')
// })
app.listen(process.env.PORT || 8080,()=>{
   mongoose.connect('mongodb+srv://nishant:nIfSgf2HLGSFU7zu@cluster0.2lnbj.mongodb.net/trendytech',{useNewUrlParser: true,
   useUnifiedTopology: true}).then(()=>console.log("DB connected"))
   .catch((error)=>{
       console.log(error);
   })
})

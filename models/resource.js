const mongoose=require("mongoose")

let resourceSchema=new mongoose.Schema({
    title:String,
    description:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})


module.exports=mongoose.model("Resources",resourceSchema)


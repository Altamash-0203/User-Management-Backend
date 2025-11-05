const express=require("express")
const router=express.Router()
const Resources=require("../models/resource")
let   checkUser=require("../middleware/auth")
let   checkRole=require("../middleware/role")



//create
router.post("/",checkUser,async(req,res)=>{
    let post=await Resources.create({...req.body,createdBy:req.user._id})
    res.send("created succesfull")
})


//get all

router.get("/",checkUser,async(req,res)=>{
    let resource=await Resources.find()
    res.send(resource)
})



//delete admin only
router.delete("/:id",checkUser,checkRole("admin"),async(req,res)=>{
    await Resources.findByIdAndDelete(req.params.id)
    res.send("Resource Deleted")
})


module.exports=router
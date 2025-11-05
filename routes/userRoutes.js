const express=require("express")
const router=express.Router()
const Users=require("../models/user")
let   checkUser=require("../middleware/auth")
let   checkRole=require("../middleware/role")



//admin get user
router.get("/",checkUser,checkRole("admin"),async(req,res)=>{
    let users=await Users.find().select("-password")
    res.send(users)
})


//update own profile
router.put("/profile",checkUser,async(req,res)=>{
    let update=await Users.findByIdAndUpdate(req.user._id,req.body,{new:true})
    res.send("update successs")
})

module.exports=router


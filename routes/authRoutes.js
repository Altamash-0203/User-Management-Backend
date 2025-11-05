const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const Users=require("../models/user")



let t=(id,role)=>{
    return jwt.sign({id,role},process.env.JWT_KEY,{expiresIn:"1h"})
}



//signup

router.post("/signup",async(req,res)=>{
    try{
        const {userName,email,password,role}=req.body
        let user=await Users.create({userName,email,password,role})
        res.json({token:t(user._id,user.role)})
    }
    catch(err){
        res.send(err.message)
    }
})


//signin
router.post("/signin",async(req,res)=>{
    const {email,password}=req.body
    let user=await Users.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.send({token:t(user._id,user.role)})
    }
    else{
        res.send("invalid info")
    }
})


module.exports=router
const jwt=require("jsonwebtoken")
let Users=require("../models/user")


let checkUser=async(req,res,next)=>{
   let token = req.headers.authorization?.split(" ")[1]
    if(!token) return res.send("Plzzz provide token")

    try{
        let decoded=jwt.verify(token,process.env.JWT_KEY)
        req.user=await Users.findById(decoded.id).select("-password")
        next()
    }
    catch(err){
        res.send(err.message)
    }
}


module.exports=checkUser
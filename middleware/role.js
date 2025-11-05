
let checkRole=(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.send("somthing went wrong")
    }
    next()
  }
}


module.exports=checkRole
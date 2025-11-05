const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")



let userSchema=new mongoose.Schema({
    userName:String,
    email:{type:String,unique:true},
    password:String,
    role:{type:String,enum:["user","admin"],default:"user"}
})


userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next()

        this.password=await bcryptjs.hash(this.password,10)
        next()
})


userSchema.methods.matchPassword=async function(password) {
    return await bcryptjs.compare(password,this.password)
}

module.exports=mongoose.model("Users",userSchema)


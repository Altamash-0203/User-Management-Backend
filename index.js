require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")


const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const resourceRoutes=require("./routes/resourceRoutes")


const app=express()

app.use(cors())
app.use(express.json())




//Routes

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/resource",resourceRoutes)


//connect db

mongoose.connect(process.env.DB_URI)
.then(()=>console.log("connected to db"))
.catch((err)=>console.log(err))


let port=process.env.PORT||3000

app.listen(port,()=>{
    console.log("server started")
})
const db=require("./models")
const cors=require("cors")
const express=require("express")
const {userroute}=require("./routes/User.route")
const { blogroute}=require("./routes/Blog.route")
const {commentroute}=require("./routes/Comment.route")
const app=express();

app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.use("/users",userroute)
app.use("/blogs",blogroute)
app.use("/comment",commentroute)

db.sequelize.sync().then(()=>{
app.listen(3001,()=>{
    console.log("Server Started")
})


})
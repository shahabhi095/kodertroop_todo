const express = require("express")
const { connection } = require("./config/db")
const app = express()
require("dotenv").config()
const cors = require("cors");
const { todoRouter } = require("./routes/todo.routes");
app.use(cors({ origin: "*" }));
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome to TODO App")
})

app.use("/api", todoRouter)


app.listen(process.env.PORT, async()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    try{
        await connection
        console.log("server is connected to DB");
    }catch(err){console.log(err)}
})


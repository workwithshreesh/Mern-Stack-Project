const express = require("express");
const {connectMongo} = require("./conn")
const routerAuth = require("./routes/user");
const routerCase = require("./routes/case");

const app = express()
app.use(express.json())
app.use("/auth",routerAuth);
app.use("/case",routerCase);

async function startServer(){
    try{
        const url = "mongodb+srv://user2000:test1234@cluster0.zq2er.mongodb.net/practice"
        connectMongo(url).then(()=>console.log("Database is conected..."))
        const PORT = 8000;
        app.listen(PORT,()=>console.log("Server is started..."));

    } catch (error){
        console.log("error in server", error)
    }
}

startServer();
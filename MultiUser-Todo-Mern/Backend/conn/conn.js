const mongoose = require("mongoose");
// const express = require("express");

const conn = async () =>{
        try{
            await mongoose.connect(
                "mongodb+srv://user2000:test1234@cluster0.zq2er.mongodb.net/todolist"
                )
                .then(()=>{
                console.log("Database connected")
            });
        } catch(error){
            console.error("Database is not connected", error)
        }

}

conn()

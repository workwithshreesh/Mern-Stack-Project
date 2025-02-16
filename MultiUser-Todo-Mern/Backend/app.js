const express = require("express");
require("./conn/conn"); 
const auth = require("./route/auth");
const list = require("./route/list");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

app.use("/api/v1",auth);
app.use("/api/v2",list)
  // Start the server after successful DB connection
  app.listen(8000, () => {
    console.log("App is listening on port 3000");
  });




// LnTNIfpUJl1rx0fu

// shreesht366
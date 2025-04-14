const express = require("express");
const cors = require("cors");
const verifyToken = require("./middleware/jwtAuthentication");
require("./conn/conn"); 
const auth = require("./route/auth");
const list = require("./route/list");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Allow all origin
app.use(cors());

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

app.use("/api/v1",auth);
app.use("/api/v2",verifyToken,list)
  // Start the server after successful DB connection
  app.listen(8000, () => {
    console.log("App is listening on port 8000");
  });





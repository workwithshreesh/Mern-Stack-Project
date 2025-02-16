const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:  {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type:  String,
        required: true
    },
    list: [{
        type:mongoose.Types.ObjectId,
        ref: "list",
    },
],

});

module.exports = mongoose.model("User",userSchema);
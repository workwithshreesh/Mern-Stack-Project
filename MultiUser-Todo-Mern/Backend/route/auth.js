const router = require("express").Router();
const user = require("../model/user");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// secret key in jwt
const JWT_SECRET = "SHREESH"

// SIGN UP

router.post("/register", async (req,res)=>{
    try{
        const {email,username,password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email, username, password: hashpassword});
        await user.save().then(()=>
            res.status(200).json({user: user})
        );

    } catch (error) {
        res.status(400).json({message:"User not exist"});
    }
});


// SIGN IN
router.post("/signin",async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(401).json({message: "Please signup first"})
    }
    const ispassword = bcrypt.compareSync(req.body.password, user.password);
    if(!ispassword){
        res.status(401).json({message: "Your password is not valid"});
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET, 
        { expiresIn: "1h" }
    );

    const {password, ...others} = user._doc;
    res.status(200).json({others, token})

    } catch (error){
        res.status(400).json({message: "user not exist"});
    }
});



module.exports =  router
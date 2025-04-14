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
            res.status(200).json({message:"User register successfull",user: user})
        );

    } catch (error) {
        res.status(200).json({message:"User alredy exist"});
    }
});


// SIGN IN
router.post("/signin",async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(401).json({message: "Please signup first"})
    }
    const ispassword = await bcrypt.compare(req.body.password, user.password);
    if(!ispassword){
        return res.status(401).json({message: "Your password is not valid"});
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET, 
        { expiresIn: "1h" }
    );

    const {password, ...others} = user._doc;
    return res.status(200).json({others, token, message:"Login successful!"})

    } catch (error){
        return res.status(400).json({message: "user not exist"});
    }
});



router.delete("/userdel/:id",async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(401).json({message: "Please signup first"})
    }
    
    return res.status(200).json({message:"User is deleted!"})

    } catch (error){
        return res.status(400).json({message: "user not exist"});
    }
});



module.exports =  router
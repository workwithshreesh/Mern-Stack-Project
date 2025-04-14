const bcrypt = require("bcryptjs");
const User = require("../models/user");


const RegisterUsers = async (req,res) => {
    const {name,email,password,role} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"Bad Request"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(200).json({message:"User is already available"})
    }else{

        const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);

    const user = new User({
        name,
        email,
        password:hashedPassword,
        role
    })

    const result = await user.save();
    console.log(user)
    return res.status(200).json({messsage:"User Registered", user:result})

    }

    
}



const LoginUser = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Bad Request"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        if((email == existingUser.email) && ( await bcrypt.compare(password, existingUser.password))){
            req.session.user = {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
              };
          
            return res.status(200).json({user:existingUser});
        }else{
            return res.status(202).json({message:"Invalid username and passsword"});
        }
    }

}


module.exports = {
    LoginUser,
    RegisterUsers
}
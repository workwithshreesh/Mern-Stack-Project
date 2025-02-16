const router = require("express").Router();
const User = require("../model/user");
const List = require("../model/list");

router.post("/addTask", async (req,res)=>{
    try{

    const {title, body, email} = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        const list = new List({
            title,body,user:existingUser
        });
        await list.save().then(()=>res.status(200).json({ list }));
        existingUser.list.push(list);
        existingUser.save()

    }
    } catch (error){
        console.log(error)
    }
});


// Update
router.put("/updateTask/:id", async (req, res)=>{
    try{
        const {title, body, email} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            const list = await List.findByIdAndUpdate(req.params.id,{title,body});
            list.save().then(()=>res.status(200).json({"message":"Task Updated"}));
        }
    } catch (error){
        console.log(error)
    }
});


// Delete
router.delete("/deleteTask/:id", async (req,res)=>{
    try{
        const {title, body, email} = req.body;
        const existingUser = await User.findOneAndUpdate(
            {email},
            {$pull:{List:req.params.id}
        }
        );
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).
            then(()=>res.status(200).json({"Task":"Deleted"}));
        }
    } catch(error){
        console.log(error);
    }
});


// Get by id
router.get("/GetTask/:id",async (req,res)=>{
    try{
        const list = await List.find({user: req.params.id}).sort({createdAt: -1});
        if(list.length !== 0){
            return res.status(200).json({list:list});
        }else{
            return res.status(200).json({list:"No Task"});
        }
    } catch (error){
        console.log(error,"error in get by id")
    }
})

module.exports = router
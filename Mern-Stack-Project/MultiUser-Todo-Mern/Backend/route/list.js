const router = require("express").Router();
const User = require("../model/user");
const List = require("../model/list");

router.post("/addTask", async (req, res) => {
    try {

        const { title, body, id } = req.body;
        const existingUser = await User.findById( id );
        if (existingUser) {
            const list = new List({
                title,
                body,
                user: existingUser._id // store ObjectId only

            });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            existingUser.save()

        }
    } catch (error) {
        console.log(error)
    }
});


// Update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const list = await List.findByIdAndUpdate(req.params.id, { title, body });
            list.save().then(() => res.status(200).json({ "message": "Task Updated" }));
        }
    } catch (error) {
        console.log(error)
    }
});


// Delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            {
                $pull: { List: req.params.id }
            }
        );
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).
                then(() => res.status(200).json({ "Task": "Deleted" }));
        }
    } catch (error) {
        console.log(error);
    }
});


// Get by id
router.get("/GetTask/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const list = await List.find()

        console.log(list)
        if (!list || list.length === 0) {
            return res.status(200).json({ list: [] }); // Always return an array, not a string
        }

        return res.status(200).json({ list }); // { list: [...] }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router
const mongoose =  require("mongoose");

const caseSchema = new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    description:{
        type:String,
        default:"Description Is nOt wrighted"
    },
    prescription:{
        type:String,
        default:"Prescription is not wrighted"
    },
    status:{
        type:String,
        enum: ["pending","reviewed"],
        default: "pending"
    }

},
{timestamps:true}
);

const Case = mongoose.model("case",caseSchema)

module.exports = Case;
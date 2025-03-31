const Case = require("../models/case");

const newCase = async (req,res) => {
    const {description, doctorId, id} = req.body;
    if (!description || !doctorId){
        return res.status(400).json({message:"Bad Request"})
    }
    console.log(req.user)
    const fileNewCase = new Case({
        patientId:id, 
        doctorId,
        description
    });

    await fileNewCase.save()
    res.status(200).json({message:"Case submited successfully"});

}



const updateCase = async (req,res) =>{
    const {prescription} = req.body;
    const id = req.params.id;
    if(!prescription){
        return res.status(400).json({message:"please provide the prescription"});
    }
    const updateCase = Case.findOne({id});
    if (!updateCase &&(updateCase.doctorId.toString() != req.user.id)){
        return res.status(200).json({message:"Updated case"});
    }
    
    Case.prescription = prescription;
    Case.status = "reviewed";

    await Case.save();
    return res.status(200).json(Case);
}



const getCases = async (req,res) => {
    const Cases = await find({doctorId: req.user.id}).populate("patientId","name email");
    res.json(Cases);
}

const getCasesUsers = async (req,res) => {
    const Cases = await find({patientId: req.user.id}).populate("doctorId","name email");
    res.json(Cases);
}

// const getAllDoctors
// const getAllCases

module.exports = {
    newCase,
    updateCase,
    getCases,
    getCasesUsers
}
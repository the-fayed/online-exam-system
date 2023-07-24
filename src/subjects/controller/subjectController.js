const { StatusCodes } = require("http-status-codes");
const Subject = require(`../model/subjectModel`);
const User = require("../../users/model/userModel");

exports.addSubjectHandler = async (req, res) => {
    const {subjectName, subjectCode, teachBy} = req.body;
    try {
        const exist = await Subject.findOne({subjectCode: subjectCode.toUpperCase()});
        if (exist) {
            res.status(StatusCodes.BAD_REQUEST).json({message: `Subject already exist!`})
        }else {
            const subject = await Subject.create({
                subjectName,
                subjectCode,
                teachBy
            })
            res.status(StatusCodes.CREATED).json({message: `${subjectName} created successfully!`, data: subject})
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `Internal server error!`, error: error});
        console.log(error);
    }
};

exports.getAllSubjectsHandler = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findOne({_id : id});
        let subjectsCount = 0;
        if (user && user.verified == true) {
            const subjects = await Subject.find({teachBy: id}).select(`-teachBy`);
            for (let subject in subjects) {
                subjectsCount ++;
            }
            res.status(StatusCodes.OK).json({message: `${user.userName}'s subjects`, subjectsCount: subjectsCount, data: subjects})
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `Internal server error!`, error: error});
        console.log(error);
    }
};

exports.getSubjectInfoHandler = async (req, res) => {
    const {id} = req.query;
    try {
        const subject = await Subject.findOne({_id: id});
        if (subject) {
            res.status(StatusCodes.OK).json({message: `${subject.subjectName}`, data: subject});
        }else {
            res.status(StatusCodes.BAD_REQUEST).json({message: `Something went wrong, please try again later!`})
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `Internal server error!`, error: error});
        console.log(error);
    }
}

exports.deleteSubjectHandler = async (req, res) => {
    const {id} = req.params;
    try{
        const subject = await Subject.findOne({_id: id});
        if (subject) {
            const deleted = await Subject.deleteOne({_id: id});
            if (deleted.deletedCount > 0) {
                res.status(StatusCodes.OK).json({message: `${subject.subjectName} deleted successfully`});  
            }else {
                res.status(StatusCodes.BAD_REQUEST).json({message: `Something went wrong, please try again later!`})
            }
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({message: `Subject not found!`})
        }
    }catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `Internal server error!`, error: error});
        console.log(error);
    }
}
const { StatusCodes } = require("http-status-codes");
const Department = require(`../model/departmentModel`);

exports.addDepartmentHandler = async (req, res) => {
  const { departmentName } = req.body;
  try {
    const exist = await Department.findOne({
      departmentName:
        departmentName.charAt(0).toUpperCase() + departmentName.slice(1),
    });
    if (exist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Department already exist!` });
    } else {
      let department = await Department.create({
        departmentName,
      });
      res
        .status(StatusCodes.CREATED)
        .json({
          message: `${departmentName} department created successfully!`,
          data: department,
        });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.updateDepartmentHandler = async (req, res) => {
    const {id} = req.params;
    const {departmentName} = req.body;
    try {
        const department = await Department.findOneAndUpdate({_id: id}, {
            departmentName: departmentName,
        }, {new: true});
        if (department) {
            res.status(StatusCodes.OK).json({message: `${departmentName} updated successfully!`, data: department})
        }else {
            res.status(StatusCodes.BAD_REQUEST).json({message: `Error while updating!`})
        }
    } catch (error) {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
}

exports.getAllDepartmentsHandler = async (req, res) => {
    try {
        let departmentsCount = 0
        const departments = await Department.find();
        for (let department in departments) {
            departmentsCount ++;
        };
        res.status(StatusCodes.OK).json({message: `Success!`, departmentsCount: departmentsCount, data: departments});
    } catch (error) {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
};

exports.getDepartmentInfoHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const department = await Department.findOne({_id: id});
        if (department) {
            res.status(StatusCodes.OK).json({message: `Success!`, data: department});
        }else {
            res.status(StatusCodes.NOT_FOUND).json({message: `Department not found!`})
        }
    } catch (error) {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
}

exports.deleteDepartmentHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await Department.findByIdAndDelete({_id: id});
        if (deleted) {
            res.status(StatusCodes.OK).json({message: `Deleted successfully!`, data: id})
        }else {
            res.status(StatusCodes.BAD_REQUEST).json({message: `Error while deleting!, please try again later.`})
        }
    } catch (error) {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal server error!`, error: error });
      console.log(error);
    }
};

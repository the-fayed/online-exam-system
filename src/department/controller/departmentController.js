const { StatusCodes } = require("http-status-codes");
const Department = require(`../model/departmentModel`);
const paginationService = require("../../../common/services/paginationService");

exports.addDepartmentHandler = async (req, res) => {
  const { departmentName, departmentDescription } = req.body;
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
        departmentDescription,
      });
      res.status(StatusCodes.CREATED).json({
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
  const { id } = req.params;
  const { departmentName, departmentDescription } = req.body;
  try {
    const department = await Department.findOneAndUpdate(
      { _id: id },
      {
        departmentName: departmentName,
        departmentDescription: departmentDescription,
      },
      { new: true }
    );
    if (department) {
      res.status(StatusCodes.OK).json({
        message: `${departmentName} updated successfully!`,
        data: department,
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Error while updating!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getAllDepartmentsHandler = async (req, res) => {
  const { page, size } = req.query;
  const { limit, skip } = paginationService(page, size);
  try {
    let departmentsCount = 0;
    const departments = await Department.find().skip(skip).limit(limit);
    for (let department in departments) {
      departmentsCount++;
    }
    res.status(StatusCodes.OK).json({
      message: `Success!`,
      departmentsCount: departmentsCount,
      data: departments,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getDepartmentInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findOne({ _id: id });
    if (department) {
      res
        .status(StatusCodes.OK)
        .json({ message: `Success!`, data: department });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Department not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.deleteDepartmentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Department.findByIdAndDelete({ _id: id });
    if (deleted) {
      res
        .status(StatusCodes.OK)
        .json({ message: `Deleted successfully!`, data: id });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Error while deleting!, please try again later.` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

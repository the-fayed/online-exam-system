const { StatusCodes } = require("http-status-codes");
const Level = require(`../model/levelsModel`);
const paginationService = require("../../../common/services/paginationService");

exports.addNewLevelHandler = async (req, res) => {
  const { levelName, department, studentsCodes } = req.body;
  try {
    const exist = await Level.findOne({
      levelName: levelName.charAt(0).toUpperCase() + levelName.slice(1),
    });
    if (exist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `level already exists!` });
    } else {
      const level = await Level.create({
        levelName,
        department,
        studentsCodes,
      });
      res.status(StatusCodes.CREATED).json({
        message: `${level.levelName} created successfully!`,
        data: level,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getAllLevelsHandler = async (req, res) => {
  const { page, size } = req.query;
  const { skip, limit } = paginationService(page, size);
  try {
    let numberOfLevels = 0;
    const levels = await Level.find()
      .populate(`department`, `departmentName`)
      .skip(skip)
      .limit(limit);
    for (let level in levels) {
      numberOfLevels++;
    }
    res
      .status(StatusCodes.OK)
      .json({ message: `Grades list`, numberOfLevels, data: levels });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.getLevelInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const level = await Level.findOne({ _id: id }).populate(
      `department`,
      `departmentName`
    );
    if (level) {
      res
        .status(StatusCodes.OK)
        .json({ message: `${level.levelName}`, data: level });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `level not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.updateLevelHandler = async (req, res) => {
  const { id } = req.params;
  const { levelName, department, studentsCodes } = req.body;
  try {
    const level = await Level.findOne({ _id: id });
    if (level) {
      const updated = await Level.updateOne(
        { _id: id },
        { levelName, department, studentsCodes },
        { new: true }
      );
      if (updated.modifiedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Level updated successfully!`, data: updated });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while updating level!` });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Level not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

exports.deleteLevelHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const level = await Level.findByIdAndDelete({ _id: id });
    if (level) {
      res.status(StatusCodes.OK).json({
        message: `${grade.gradeName} deleted successfully!`,
        data: id,
      });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Error while deleting!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
    console.log(error);
  }
};

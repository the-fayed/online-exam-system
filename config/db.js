const mongoose = require(`mongoose`);

const dbConnection = () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`database connection error!`, error);
  }
};

module.exports = dbConnection;

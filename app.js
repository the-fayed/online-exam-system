const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require(`cors`);

require(`dotenv`).config();

const port = process.env.PORT;

//public middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// importing db connection config:
const dbConnection = require(`./config/db`);
dbConnection();

//importing user routes
const usersRoutes = require("./src/users/routes/userRoutes");

// importing subject routes
const subjectRoutes = require(`./src/subjects/routes/subjectRoutes`);

//importing department routes
const departmentRoutes = require(`./src/department/routes/departmentRoutes`);


app.use(usersRoutes);
app.use(subjectRoutes);
app.use(departmentRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

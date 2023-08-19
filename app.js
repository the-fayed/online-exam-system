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

//importing levels routes:
const levelsRoutes = require(`./src/levels/routes/levelsRoutes`);

//importing exams routes:
const examRoutes = require(`./src/exams/routes/examRoutes`);

//importing questions routes:
const questionRoutes = require(`./src/questions/routes/questionRoutes`);

//importing answers routes:
const answersRoutes = require(`./src/answers/routes/answersRoutes`);

app.use(usersRoutes);
app.use(subjectRoutes);
app.use(departmentRoutes);
app.use(levelsRoutes);
app.use(examRoutes);
app.use(questionRoutes);
app.use(answersRoutes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

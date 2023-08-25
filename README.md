# online-exam-system
![Static Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![Static Badge](https://img.shields.io/badge/18.13.0-Node.Js-green)
![Static Badge](https://img.shields.io/badge/4.18.2-Express.Js-blue)
![Static Badge](https://img.shields.io/badge/DB-MongoDB-green)
![Static Badge](https://img.shields.io/badge/7.4.0-mongoose-green)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-red)
![Static Badge](https://img.shields.io/badge/2.8.5-cors-red)
![Static Badge](https://img.shields.io/badge/1.20.2-body--parser-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-red)
![Static Badge](https://img.shields.io/badge/2.2.0-http--status--codes-red)
![Static Badge](https://img.shields.io/badge/17.9.2-joi-red)
![Static Badge](https://img.shields.io/badge/5.1.0-bcrypt-red)
![Static Badge](https://img.shields.io/badge/9.0.1-jsonwebtoken-red)
![Static Badge](https://img.shields.io/badge/3.2.0-easy--rbac-red)
![Static Badge](https://img.shields.io/badge/6.9.4-nodemailer-red)


Make it easier for professors and students to take exams and track their grades!

## Installation

First, you need to run ``` npm install ``` to install app dependencies.

Then, you need to set up the dotEnv variables:
|          | variable | stands for |
|---------:|---------:|------------|
|1|PORT| The port in which the application will run |
|2|DB_CONNECTION_STRING| The connection string with mongo atlas |
|3|BASE_URL| Application base url |
|4|SERVICE| Email service ex. Hotmail.com |
|5|SENDER| Sender email address |
|6|SENDER_PASS| Sender email password |
|7|SECRET_KEY| JWT secret key |
|8|EXPIRATION_PERIOD| Access token expiration period |


## Schemas
### User schema
```JavaScript
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [`admin`, `professor`, `student`],
      default: `student`,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: `level`,
      required: function () {
        return this.role == `student`;
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
```

### Verification token schema
```JavaScript
{
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: `user`,
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}
```

### Department schema
```JavaScript
{
    departmentName: {
        type: String,
        required: true,
        unique: true
    },
    departmentDescription: {
        type: String,
        default: ``,
    }
}, {
    timestamps: true,
}
```

### Level Schema
```JavaScript
  {
    levelName: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: `department`,
      required: true,
    },
    studentsCodes: [
      {
        type: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
```

### Subject schema 
```JavaScript
  {
    subjectName: {
      type: String,
      required: true,
    },
    subjectDescription: {
      type: String,
      default: "",
    },
    subjectCode: {
      type: String,
      min: 5,
      max: 6,
      required: true,
    },
    teachBy: {
      type: Schema.Types.ObjectId,
      ref: `user`,
      required: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: `level`,
      required: true,
    },
  },
  {
    timestamps: true,
  }
```

### Exam Schema
```JavaScript
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: `subject`,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
```

### Questions Schema 
```JavaScript
  {
    exam: {
      type: Schema.Types.ObjectId,
      ref: `exam`,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      min: 2,
      max: 4,
    },
    rightAnswer: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
      minLin: 1,
      maxLin: 1,
      max: 3,
    },
  },
  { timestamps: true }
```

### Answers schema
```JavaScript
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: `questions`,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
```

## Handling APIs

### User APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/users|POST|Addning new user|Admin|userName, email, password, role, and verified on request body|
|/api/v1/users|GET|Get all users|Admin|-|
|/api/v1/users/:id|GET|Get user info|any|userId on request params|
|/api/v1/users/:id|PATCH|Update user info|any|userId on request params and data user want to update on request body|
|/api/v1/users/:id|DELETE|Delete user|any|userId on request params|
|/api/v1/signup|POST|Open endpoint to sign up|-|userName, email, password, role, studentCode on request body|
|/api/v1/auth|POST|Open endpoint to log in|-|email, password on request body|
|/api/v1/users/:id/verify/:token|GET|Open endpoint to verify user email|-|userId, and userToken on request params|

#### Note that only the admin can add another admin or any type of system user, but the professor and student can sign up. 

### Department APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/departments|POST|Adding new depatment|Admin|departmentName, and departmentDescription on request body|
|/api/v1/departments|GET|Get all departments|Admin or Professor|-|
|api/v1/departments/:id|GET|Get department info|Admin or Professor|DepartmentId on request params|
|api/v1/departments/:id|PATCH|Update department info|Admin|DepartmentId on request params and data wanted to update on request body|
|api/v1/departments/:id|DELETE|Delete department|Admin|DepatmentId on request params|

### Level APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/levels|POST|Adding new level|Admin|levelName, department (as id), and studentsCodes on request body|
|/api/v1/levels|GET|Getting all levels|Admin or Professor|-|
|/api/v1/levels/:id|GET|Getting level info|Admin or Professor|LevelId on request params|
|/api/v1/levels/:id|PATCH|Updateing level info|Admin|LevelId on request params and data wanted to update on request body|
|/api/v1/levels/:id|DELETE|Deletting level|Admin|LeveiId on request params|

### Subject APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/subjects|POST|Adding new subject|Admin or Professor| subjectName, subjectCode, teachBy (as an id), subjectDescription, level (as an id) on req.body|
|/api/v1/subjects/:id|GET|Getting all subjects|Admin or Professor|LevelId on request params|
|/api/v1/subjects|GET|Getting a specific subject|Admin or Professor|SubjectId on request query|
|/api/v1/subjects/:id|PATCH|Updatting subject info|Admin or Professor|SubjectId on request params and data wanted to update on request body|
|/api/v1/subjects/:id|DELETE|Delete subject|Admin or Professor|SubjectId on request params|

### Exams APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/exams/:id|POST|Adding new exam|Admin or Professor|subjectID on request params and title, date, and duration on request body|
|/api/v1/exams|GET|Getting all exams|Admin or Professor|-|
|/api/v1/exams/:id|GET|Getting a specific exam|Admin or Professor|ExamId on request params|
|/api/v1/exams/:id|PATCH|Updatting exam info|Admin or Professor|ExamId on request params and data wanted to update on request body|
|/api/v1/exams/:id|DELETE|Delete exam|Admin or Professor|ExamId on request params|

### Questions APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/questions/:examId|POST|Adding new question for specific exam|Admin or Professor|ExamId on request params and question, options, and rightAnswer on request body| 
|/api/v1/questions/:examId|GET|Getting all question for specific exam|Admin or Professor|ExamId on request params|
|/api/v1/questions/:examId/:questionId|PATCH|Updatting question|Admin or Professor|ExamId and questionId on request params and data wanted to update on request body|
|/api/v1/questions/:examId/:questionId|DELETE|Deletting question|Admin or Professro|ExamId and questionId on request params|

### Answers APIs

|Endpoint|Method|Usage|Required role|Required data|
|-------:|-----:|----:|------------:|-------------|
|/api/v1/answers/:questionId/:studentId|POST|Submitting new answer for a question|Mainly Student - Admin for testing|QuestionId and studentId on request params and answer on request body|
|/api/v1/answers/:examId/:studentId|GET|Getting student grades and answers|Admin, Professor, or Student|ExamId and studentId on request params|

##### Note that all endPoints with the method Get have pagination service ex. ```/api/v1/users/?page=2&size=20```


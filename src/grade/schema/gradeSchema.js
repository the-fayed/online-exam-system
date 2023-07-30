const { Schema } = require("mongoose");


const gradeSchema = new Schema({
    gradeName: {
        type: string,
        required: true,
        unique:true
    },
},
{
    timestamps: true
})
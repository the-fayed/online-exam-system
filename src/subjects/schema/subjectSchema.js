const { Schema } = require("mongoose");


const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true,
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
        required: true
    },
}, {
    timestamps: true
})

module.exports = subjectSchema;

subjectSchema.pre(`save`,  function(next) {
    this.subjectCode = this.subjectCode.toUpperCase();
    next()
})

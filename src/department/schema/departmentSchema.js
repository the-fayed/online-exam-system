const { Schema } = require("mongoose");


const departmentSchema = new Schema({
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
})

module.exports = departmentSchema;

// hook to capitalize the first character on the department name: 

departmentSchema.pre(`save`, function(next) {
    this.departmentName = this.departmentName.charAt(0).toUpperCase() + this.departmentName.slice(1);
    next()
})


// hook to capitalize the first character on the department name on update: 

departmentSchema.pre([`update`,`findOneAndUpdate`], async function () {
    const updatedObj = this.getUpdate();

    if (`departmentName` in updatedObj) {
        updatedObj.departmentName= await updatedObj.departmentName.charAt(0).toUpperCase() + updatedObj.departmentName.slice(1);
    }
})
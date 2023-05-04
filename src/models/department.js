const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define department schema
const departmentSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  department_name: {
    type: String,
    required: true,
  },
});

// Define department model
const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
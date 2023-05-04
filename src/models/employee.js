const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  employee_id: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

// Define employee model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
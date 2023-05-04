const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const logger = require("./src/middleware/logger");
require('./src/db/connection');
const Department = require('./src/models/department');
const Employee = require('./src/models/employee');
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(express.urlencoded({ extended: true}));

// Save or update employee
app.post('/', [
  body('employee_id').isInt(),
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  body('email_address').isEmail(),
  body('department_id').custom(async (value) => {
    if (mongoose.Types.ObjectId.isValid(value)) {
      const department = await Department.findById(value);
      if (department) {
        return true;
      }
    }
    throw new Error('Invalid department id');
  })
], async (req, res) => {
  logger.debug(`${req.method} request received from ${req.socket.remoteAddress} at ${new Date()}`);
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ status: 'error', errors: errors.array() });
  }

  const {
    employee_id,
    first_name,
    last_name,
    email_address,
    department_id
  } = req.body;

  try {
    let employee = await Employee.findOne({ email_address });
    if (employee) {
      employee.employee_id = employee_id;
      employee.first_name = first_name;
      employee.last_name = last_name;
      employee.department_id = department_id;
    } else {
      employee = new Employee({
        employee_id,
        first_name,
        last_name,
        email_address,
        department_id
      });
    }

    await employee.save();

    return res.json({ status: 'success', data: employee});
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ status: 'error', error: 'Server error' });
  }
});

// Get all employees with department name
app.get('/', async (req, res) => {
  logger.debug(`${req.method} request received from ${req.socket.remoteAddress} at ${new Date()}`);
  console.log(req.query);
  try {
    const { first_name, last_name, email_address, department } = req.query;

    let employees = await Employee.find()
      .populate('department_id', 'department_name');

    if (first_name) {
      employees = employees.filter(employee =>
        employee.first_name.toLowerCase().includes(first_name.toLowerCase())
      );
    }
    if (last_name) {
      employees = employees.filter(employee =>
        employee.last_name.toLowerCase().includes(last_name.toLowerCase())
      );
    }
    if (email_address) {
      employees = employees.filter(employee =>
        employee.email_address.toLowerCase().includes(email_address.toLowerCase())
      );
    }
    if (department) {
      employees = employees.filter(employee =>
        employee.department_id.department_name.toLowerCase().includes(department.toLowerCase())
      );
    }

    return res.json({ status: 'success', data: employees });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ status: 'error', error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`listening from ${port}`);
});

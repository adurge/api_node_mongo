# Problem statement
1. Implement a REST API with Express Js to save or update an employee with fields => employee_id, first_name, last_name, email_address, department_id
2. validate the request data as
    first_name : required
    email_address : email address format
    department_id : valid department id
[For departments take a departments collection in the database with some departments data with fields "id" and "department_name" and use this department collection to verify the department_id]
3. save the data in mongo db
4. Implement second REST API to return all saved employees data with department_name and allow a query parameter to filter the employees on the basis of first_name, last_name, email_address and department
5. configure Swagger for implemented API

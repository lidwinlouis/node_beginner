const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const jwtVerify = require('../../middleware/jwtVerify');

//Notice how the middleware , jwtVerify is added to the route before the controller 
router.route('/')
    .get(jwtVerify, employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

router.route('/:id')
    .get(jwtVerify,employeeController.getEmployeeByID);

module.exports = router;
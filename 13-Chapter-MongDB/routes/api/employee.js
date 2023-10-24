const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const jwtVerify = require('../../middleware/jwtVerify');
const ROLES_LIST = require('../../config/roles_list');
const validateRoles = require('../../middleware/validateRoles');

//Notice how the middleware , jwtVerify is added to the route before the controller 
router.route('/')
    .get(employeeController.getAllEmployees)
    .post(validateRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeeController.createNewEmployee)
    .put(validateRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeeController.updateEmployee)
    .delete(validateRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route('/:id')
    .get(jwtVerify,employeeController.getEmployeeByID);

module.exports = router;
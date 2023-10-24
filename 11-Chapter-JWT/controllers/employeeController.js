const fsPromise = require('fs/promises');
const path = require('path');

const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.status(200).json(data.employees);
}

const createNewEmployee = async (req, res) => {
    
    if (!req.body.firstname || !req.body.lastname) {
        return  res.status(400).json({ "message": "Firstname and lastname values are required" });
    }
    const newEmployee = {
        "id" : data.employees[data.employees.length-1].id + 1 || 1,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname
    }
    data.setEmployees([...data.employees, newEmployee]);

    await fsPromise.writeFile(path.join(__dirname,'..','model','employees.json'), JSON.stringify(data.employees));

    res.status(201).json(data.employees);
}

const updateEmployee = async (req, res) => {
    const emp = data.employees.find(emp => emp.id == parseInt(req.body.id));
    if(!emp){
        return res.status(400).json({"message" : `Employee with id ${req.body.id} not found`});
    }
    if(req.body.firstname) emp.firstname = req.body.firstname;
    if(req.body.lastname) emp.lastname = req.body.lastname;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, emp];
    const sortedArray = unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id<b.id ? -1 :0);
    data.setEmployees(sortedArray);
    await fsPromise.writeFile(path.join(__dirname,'..','model','employees.json'), JSON.stringify(data.employees));

    res.status(200).json(data.employees);
}

const deleteEmployee = async (req, res) => {
    const filteredEmployees = data.employees.filter( emp=> emp.id !== parseInt(req.body.id));
    data.setEmployees(filteredEmployees);
    await fsPromise.writeFile(path.join(__dirname,'..','model','employees.json'), JSON.stringify(data.employees));
    res.status(200).json(data.employees);
}

const getEmployeeByID = (req, res) => {
    console.log(req.params);
    const employee = data.employees.find(emp=> emp.id == parseInt(req.params.id));
    if(!employee){
        res.status(400).json({"message" : `Employee with id ${req.params.id} not found`});
    }
    res.status(200).json(employee);
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeeByID }
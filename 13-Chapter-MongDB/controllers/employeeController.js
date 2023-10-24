const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const result = await Employee.find().exec();
    res.status(200).json(result);
}

const createNewEmployee = async (req, res) => {
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ "message": "Firstname and lastname values are required" });
    }
    const result = await Employee.create({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
    res.status(201).json(result);
}

const updateEmployee = async (req, res) => {
    const emp = await Employee.findOne({ _id: req.body.id });
    if (!emp) {
        return res.status(400).json({ "message": `Employee with id ${req.body.id} not found` });
    }
    if (req.body.firstname) emp.firstname = req.body.firstname;
    if (req.body.lastname) emp.lastname = req.body.lastname;

    const result = await emp.save();
    res.status(200).json(result);
}

const deleteEmployee = async (req, res) => {

    if (!req?.body?.id) return res.status(400).json({ "message": `ID parameter is required` });

    const emp = await Employee.findOne({ _id: req.body.id });
    if (!emp) {
        return res.status(400).json({ "message": `Employee with id ${req.body.id} not found` });
    }

    const result = Employee.deleteOne({ _id: req.body.id }).exec();
    console.log(result);
    res.status(200).json({message : `User with id ${req.body.id} successfully deleted.!`});
}

const getEmployeeByID = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": `ID parameter is required` });
    console.log( req.params.id);
    try{
        const employee = await Employee.findOne({ _id : req.params.id}).exec();
        if (!employee) {
            return res.status(204).json({ "message": `Employee with id ${req.params.id} not found` });
        }
        res.status(200).json(employee); 
    }catch(err){
        return res.status(400).json({ "message": `Error occurred ${err.message}` });
    }
    
}

module.exports = { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeeByID }
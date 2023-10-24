const express = require('express');
const router = express.Router();


const data = {};

data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        });
    });

router.route('/:id')
    .get((req, res) => {
        var resultEmp ;
        data.employees.forEach(emp => {
           if(emp.id == req.params.id)
            resultEmp = emp;
        });
        //console.log(response);
        res.json({
            "firstname": resultEmp?.firstname,
            "lastname": resultEmp?.lastname
        }); 
    });

module.exports = router;
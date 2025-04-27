const express = require('express');
const router = express.Router();
const userRepo = require('../utils/employee.repository');

router.get('/list', employeeListAction);
router.get('/show/:EmployeesID', employeeShowAction);
router.get('/del/:EmployeesID', employeeDelAction);
router.post('/update/:EmployeesID', employeeUpdateAction);

async function employeeListAction(request, response) {
    var users = await userRepo.getAllEmployees();
    response.send(JSON.stringify(users));
}
async function employeeShowAction(request, response) {
    var oneUser = await userRepo.getOneEmployee(request.params.EmployeesID);
    response.send(JSON.stringify(oneUser));
}
async function employeeDelAction(request, response) {
    var numRows = await userRepo.delOneEmployee(request.params.EmployeesID);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function employeeUpdateAction(request, response) {
    var EmployeesID = request.params.EmployeesID;
    if (EmployeesID === "0") EmployeesID = await userRepo.addOneEmployee(
        request.body.name, 
        request.body.email, 
        request.body.password
    );
    var numRows = await userRepo.editOneEmployee(
        EmployeesID, 
        request.body.name, 
        request.body.email, 
        request.body.password
    );
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;

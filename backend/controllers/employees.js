const Employees = require('../models').EmoloyeesTable;

const getEmployees  = async (req, res) => {
    try {
        Employees.findAll().then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};

const getEmployeeById = async (req, res) => {
    try {
        Employees.findOne({where: {EmployeeId: req.params.id}}).then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};


const createEmployee = async (req, res) => {
    console.log(req.body);

    try {
        Employees.create({
            Email: req.body.Email,
            HireDate: req.body.HireDate,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            DepartmentId: req.body.DepartmentId,
            Phone: req.body.Phone,
            Birthdate: req.body.Birthdate,
            UserId: req.body.UserId,
            Salary: req.body.Salary
        }).then(result => 
            res.status(200).send(result ));

        
    } catch (err) {
        return res.send(err);
    }
};

const updateEmployee = async (req, res) => {
    console.log(req.params.id);
    Employees.update({
        Email: req.body.Email,
        HireDate: req.body.HireDate,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        DepartmentId: req.body.DepartmentId,
        Phone: req.body.Phone,
        Birthdate: req.body.Birthdate,
        Salary: req.body.Salary
    }, { where: { EmployeeId: req.params.id } }).then(result => res.status(200).send(result));
}


const getEmpByUserId = async (req,res) => {
    try {
        Employees.findOne({where: {UserId: req.params.id}}).then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
}

const deleteEmployee = async (req, res) => {
    console.log(req.params.id);
    Employees.destroy({ where: { EmployeeId: req.params.id } }).then(result => res.status(200).send({msg: 'success'}));
}
module.exports = {
    updateEmployee,
    createEmployee,
    getEmployees,
    deleteEmployee,
    getEmployeeById,
    getEmpByUserId
    

}
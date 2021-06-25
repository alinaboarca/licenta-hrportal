const Departments = require('../models').DepartmentsTable;

const getDep  = async (req, res) => {
    try {
        Departments.findAll().then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};
const createDep = async (req, res) => {
    console.log(req.body);

    try {
        Departments.create({
           Name: req.body.Name,
           Address: req.body.Address
        }).then(result => 
            res.status(200).send(result ));

        
    } catch (err) {
        return res.send(err);
    }
};

const updateDep = async (req, res) => {
    console.log(req.params.id);
    Departments.update({
        Name: req.body.Name,
           Address: req.body.Address
    }, { where: { DepartmentId: req.params.id } }).then(result => res.status(200).send(result));
}
const deleteDep = async (req, res) => {
    Departments.destroy({ where: { DepartmentId: req.params.id } }).then(result => res.status(200).send({msg: 'success'}));
}
module.exports = {
    updateDep,
    createDep,
    deleteDep,
    getDep
    

}
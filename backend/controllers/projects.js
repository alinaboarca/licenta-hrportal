const Projects = require('../models').ProjectsTable;
const Employees = require('../models').EmoloyeesTable;
const ProjectHistories = require('../models').ProjectsHistory;

const getProjects  = async (req, res) => {
    try {
        Projects.findAll().then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};

const assignProjectToEmployee = async (req, res) => {
    try {
    ProjectHistories.create({
        EmployeeId: req.body.EmployeeId,
        ProjectId: req.body.ProjectId
        }).then(result => 
            res.status(200).send(result ));

        
    } catch (err) {
        return res.send(err);
    }
};

const getAllProjectsOfOneEmployee = async (req, res) => {
    try {
    ProjectHistories.findAll({ where: { EmployeeId: req.params.id}, include: [Projects]
        }).then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};

const createProject = async (req, res) => {
    console.log(req.body);

    try {
        Projects.create({
        Name: req.body.Name,
        Type: req.body.HireDaTypete,
        ClientName: req.body.ClientName,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        Status: req.body.Status,
        }).then(result => 
            res.status(200).send(result ));

        
    } catch (err) {
        return res.send(err);
    }
};

const updateProject = async (req, res) => {
    console.log(req.params.id);
    Projects.update({
        Name: req.body.Name,
        Type: req.body.HireDaTypete,
        ClientName: req.body.ClientName,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        Status: req.body.Status,
    }, { where: { ProjectId: req.params.id } }).then(result => res.status(200).send(result));
}


const deleteProject = async (req, res) => {
    console.log(req.params.id);
    Projects.destroy({ where: { ProjectId: req.params.id } }).then(result => res.status(200).send({msg: 'success'}));
}
module.exports = {
    updateProject,
    createProject,
    getProjects,
    deleteProject,
    assignProjectToEmployee,
    getAllProjectsOfOneEmployee
    

}
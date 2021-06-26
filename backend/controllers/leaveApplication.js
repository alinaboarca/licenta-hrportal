const LeaveApplication = require('../models').LeaveApplicationTable;

const getAllApplications  = async (req, res) => {
    try {
        LeaveApplication.findAll().then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};

const getAllApplicationsForOneUser = async (req, res) => {
    try {
        LeaveApplication.findAll({where: {LeaveApplicationId: req.params.id}}).then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};


const createApplication = async (req, res) => {
    console.log(req.body);
    try {
        LeaveApplication.create({
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Reason: req.body.Reason,
            NumberOfHours: req.body.NumberOfHours,
            Status: req.body.Status,
            EmployeeId: req.body.EmployeeId
        }).then(result => 
            res.status(200).send(result ));

        
    } catch (err) {
        return res.send(err);
    }
};

const updateApplication = async (req, res) => {
    console.log(req.params.id);
    LeaveApplication.update({
        StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Reason: req.body.Reason,
            NumberOfHours: req.body.NumberOfHours,
            Status: req.body.Status,
            EmployeeId: req.body.EmployeeId
    }, { where: { EmployeeId: req.params.id } }).then(result => res.status(200).send(result));
}


const getApplicationById = async (req,res) => {
    try {
        LeaveApplication.findOne({where: {LeaveApplicationId: req.params.id}}).then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
}

const deleteApplication = async (req, res) => {
    console.log(req.params.id);
    LeaveApplication.destroy({ where: { LeaveApplicationId: req.params.id } }).then(result => res.status(200).send({msg: 'success'}));
}
module.exports = {
   getAllApplications,
   getAllApplicationsForOneUser,
   getApplicationById,
   updateApplication,
   deleteApplication,
   createApplication
    

}
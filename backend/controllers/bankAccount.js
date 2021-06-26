const Account = require('../models').BankAccountTable;

const getAcc  = async (req, res) => {
    try {
        Account.findAll().then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};
const getAccByEmpId  = async (req, res) => {
    try {
        Account.findAll({EmployeeId: req.params.id}).then(result => 
            res.status(200).send(result ));
    } catch (err) {
        return res.send(err);
    }
};
const createAcc = async (req, res) => {
    console.log(req.body);

    try {
        Account.create({
            IBAN: req.body.IBAN,
            SwiftCode: req.body.SwiftCode,
            BankName: req.body.BankName,
            EmployeeId: req.body.EmployeeId
        }).then(result => 
            res.status(200).send(result ));

        
    } catch (err) {
        return res.send(err);
    }
};

const updateAcc = async (req, res) => {
    console.log(req.params.id);
    Account.update({
        IBAN: req.body.IBAN,
            SwiftCode: req.body.SwiftCode,
            BankName: req.body.BankName
    }, { where: { AccountId: req.params.id } }).then(result => res.status(200).send(result));
}
const deleteAcc = async (req, res) => {
    Account.destroy({ where: { AccountId: req.params.id } }).then(result => res.status(200).send({msg: 'success'}));
}
module.exports = {
    deleteAcc,
    updateAcc,
    createAcc,getAcc,
    getAccByEmpId
}
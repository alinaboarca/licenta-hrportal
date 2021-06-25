const UsersTable = require('../models').UsersTable;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersService = require('../services/users');

const registerUser = async (req, res) => {

    //verificam daca exista deja un user cu numele introdus
    let userFound;
    userFound = await usersService.findUserByUsername(req.body.Username)
    console.log(req.body);

    if (userFound) {
        return res.status(409).send({ message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);

    //generam parola criptata
    let ePassword = bcrypt.hashSync(req.body.Password, salt);

    try {
        UsersTable.create({
            Username: req.body.Username,
            Password: ePassword,
            Role: req.body.Role
        }).then(result => {
           
            res.send(result );
        });
    } catch (err) {
        return res.send(err);
    }


};
const login = async (req, res) => {

    //verific daca am ceva in body-ul requestului
    if (req.body.username === "" || req.body.password === "") {
        return res.status(500).send({ message: "Email or password is empty" });
    }

    console.log(req.body)

    //caut user-ul dupa nume in baza de date
    let userFound;
    userFound = await usersService.findUserByUsername(req.body.username)

    try {
        //compar parolele
        const validPass = bcrypt.compareSync(req.body.password, userFound.Password);
        if (!validPass) {
            return res.status(400).send({ message: "Wrong password" });
        }

        const token = jwt.sign({ id: userFound.UserId }, process.env.TOKEN_SECRET,
            {
                expiresIn: "3h"
            });

        res.status(200).send({ token, result: userFound });
    } catch (err) {
        return res
            .status(404)
            .send({ message: "No email related to an account was found" });
    }
};


const getAllUsers = async (req, res) => {

    
    try {
        UsersTable.findAll().then(result => { res.send(result ); });
    } catch (err) {
        return res.send(err);
    }
}

const editUser = async (req, res) => {

    
    try {
        UsersTable.update({
            Username: req.body.Username,
            Role: req.body.Role
        },{ where: { UserId: req.params.id } }).then(result => {
           
            res.send(result );
        });
    } catch (err) {
        return res.send(err);
    }
}

const deleteUser = async (req, res) => {

    
    try {
        UsersTable.destroy({ where: { UserId: req.params.id } }).then(result => res.status(200).send({msg: 'success'}));
    } catch (err) {
        return res.send(err);
    }
}



module.exports = {
    registerUser,
    login,
    getAllUsers,
    deleteUser,
    editUser
}
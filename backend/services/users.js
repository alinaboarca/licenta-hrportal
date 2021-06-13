const UsersTable = require("../models").UsersTable;

const findUserByUsername = async (username) => {
    let userFound;
    await UsersTable.findOne({
        where: {
            Username: username
        }
    }).then(result => {
        userFound = result
    });

  return userFound;
};

module.exports = {
    findUserByUsername,
  };
  
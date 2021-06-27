let sequelize = require('./db_connection');
const EmoloyeesTable = sequelize.import('./employees.js');
const ProjectsTable = sequelize.import('./projects.js');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectsHistory', {
        "ProjectId": {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        "EmployeeId": {
            type: DataTypes.UUID,
            primaryKey: true,
        }
    });
}
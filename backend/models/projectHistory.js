let sequelize = require('./db_connection');
const EmoloyeesTable = sequelize.import('./employees.js');
const ProjectsTable = sequelize.import('./projects.js');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProjectsHistory', {
        "ProjectId": {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: ProjectsTable,
                key: 'ProjectId'
              }
        },
        "EmployeeId": {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: EmoloyeesTable,
                key: 'EmployeeId'
              }
        }
    });
}
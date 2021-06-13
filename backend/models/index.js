let sequelize = require('./db_connection.js');
const UsersTable = sequelize.import('./users.js');
const EmoloyeesTable = sequelize.import('./employees.js');
const ProjectsTable = sequelize.import('./projects.js');
const ProjectsHistory = sequelize.import('./projectHistory.js');
const DepartmentsTable = sequelize.import('./departments.js');
const BankAccountTable = sequelize.import('./bankAccount.js');


//useri si angajati
UsersTable.hasOne(EmoloyeesTable, { foreignKey: 'UserId', onDelete: 'cascade', onUpdate: 'cascade' });
EmoloyeesTable.belongsTo(UsersTable, { foreignKey: 'UserId', onDelete: 'cascade', onUpdate: 'cascade' });

//angajati si conturi bancare

EmoloyeesTable.hasOne(BankAccountTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });
BankAccountTable.belongsTo(EmoloyeesTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });

//useri si 
DepartmentsTable.hasMany(EmoloyeesTable, { foreignKey: 'DepartmentId', onDelete: 'cascade', onUpdate: 'cascade' });
EmoloyeesTable.belongsTo(DepartmentsTable, { foreignKey: 'DepartmentId', onDelete: 'cascade', onUpdate: 'cascade' });

module.exports = {
    sequelize,
    UsersTable, 
    EmoloyeesTable,
    ProjectsTable,
    ProjectsHistory,
    DepartmentsTable,
    BankAccountTable
}
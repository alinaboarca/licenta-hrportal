let sequelize = require('./db_connection.js');
const UsersTable = sequelize.import('./users.js');
const EmoloyeesTable = sequelize.import('./employees.js');
const ProjectsTable = sequelize.import('./projects.js');
const ProjectsHistory = sequelize.import('./projectHistory.js');
const DepartmentsTable = sequelize.import('./departments.js');
const BankAccountTable = sequelize.import('./bankAccount.js');
const LeaveApplicationTable =  sequelize.import('./leaveApplication.js');


//useri si angajati
UsersTable.hasOne(EmoloyeesTable, { foreignKey: 'UserId', onDelete: 'cascade', onUpdate: 'cascade' });
EmoloyeesTable.belongsTo(UsersTable, { foreignKey: 'UserId', onDelete: 'cascade', onUpdate: 'cascade' });

//angajati si conturi bancare

EmoloyeesTable.hasOne(BankAccountTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });
BankAccountTable.belongsTo(EmoloyeesTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });

//useri si departmente
DepartmentsTable.hasMany(EmoloyeesTable, { foreignKey: 'DepartmentId', onDelete: 'cascade', onUpdate: 'cascade' });
EmoloyeesTable.belongsTo(DepartmentsTable, { foreignKey: 'DepartmentId', onDelete: 'cascade', onUpdate: 'cascade' });

//angajati si cereri
EmoloyeesTable.hasMany(LeaveApplicationTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });
LeaveApplicationTable.belongsTo(EmoloyeesTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });

ProjectsTable.hasMany(ProjectsHistory, { foreignKey: 'ProjectId', onDelete: 'cascade', onUpdate: 'cascade' });
ProjectsHistory.belongsTo(ProjectsTable, { foreignKey: 'ProjectId', onDelete: 'cascade', onUpdate: 'cascade' })

EmoloyeesTable.hasMany(ProjectsHistory, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' });
ProjectsHistory.belongsTo(EmoloyeesTable, { foreignKey: 'EmployeeId', onDelete: 'cascade', onUpdate: 'cascade' })

module.exports = {
    sequelize,
    UsersTable, 
    EmoloyeesTable,
    ProjectsTable,
    ProjectsHistory,
    DepartmentsTable,
    BankAccountTable,
    LeaveApplicationTable
}
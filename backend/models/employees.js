module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Employees', {
        'EmployeeId': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        "FirstName": DataTypes.STRING,
        "LastName": DataTypes.STRING,
        "Birthdate":DataTypes.STRING,
        "Phone": DataTypes.STRING,
        "Email": DataTypes.STRING,
        "HireDate": DataTypes.STRING,
        "Salary": DataTypes.STRING,
    });
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Departments', {
        'DepartmentId': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        "Name": DataTypes.STRING,
    });
}
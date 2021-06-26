module.exports = (sequelize, DataTypes) => {
    return sequelize.define('LeaveApplication', {
        'LeaveApplicationId': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        "StartDate": DataTypes.STRING,
        "EndDate": DataTypes.STRING,
        "Reason":DataTypes.STRING,
        "NumberOfHours": DataTypes.STRING,
        "Status": DataTypes.STRING
    });
}
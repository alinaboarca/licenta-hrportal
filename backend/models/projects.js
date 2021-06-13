module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Projects', {
        'ProjectId': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        "Name": DataTypes.STRING,
        "Type": DataTypes.STRING,
        "ClientName":DataTypes.STRING,
        "StartDate":DataTypes.STRING,
        "EndDate":DataTypes.STRING,
        "Status":DataTypes.STRING,
    });
}
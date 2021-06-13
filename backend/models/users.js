
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        'UserId': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        'Username': DataTypes.STRING,
        'Password': DataTypes.STRING,
        'Role': DataTypes.STRING,
        
        'Date_Created': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        
    }
);
}
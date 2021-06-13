module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BankAccounts', {
        'AccountId': {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        "IBAN": DataTypes.STRING,
        "SwiftCode": DataTypes.STRING,
        "BankName":DataTypes.STRING,
    });
}
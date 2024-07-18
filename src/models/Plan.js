const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'plan',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.ENUM('Free', 'Premium'),
                defaultValue: 'Free',
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.00,
            },
        }, {
            timestamps: true
        }
    )
}
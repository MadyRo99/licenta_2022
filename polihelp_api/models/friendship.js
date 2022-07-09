'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Friendship extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Friendship.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstUserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'cascade'
            }
        },
        secondUserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'cascade'
            }
        },
        requestDate: {
            type: DataTypes.DATE,
            default: DataTypes.NOW
        },
        approveDate: {
            type: DataTypes.DATE,
            default: null
        },
        deniedDate: {
            type: DataTypes.DATE,
            default: null
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'friendship',
    });

    return Friendship;
};
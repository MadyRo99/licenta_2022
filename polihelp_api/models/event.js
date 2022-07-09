'use strict'

const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Event.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        authorId: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            length: 100
        },
        location: {
            type: DataTypes.STRING,
            length: 100
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        },
        image: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
            length: 7500
        },
        createdAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'event'
    })

    return Event
}
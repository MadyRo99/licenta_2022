'use strict'

const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class EventParticipant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    EventParticipant.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'cascade'
            }
        },
        eventId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'events',
                key: 'id',
                onDelete: 'cascade'
            }
        }
    }, {
        sequelize,
        modelName: 'event_participants',
        timestamps: false
    })

    return EventParticipant
}
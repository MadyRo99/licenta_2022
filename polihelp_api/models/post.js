'use strict'

const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Post.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'cascade'
            }
        },
        content: {
            type: DataTypes.TEXT,
            length: 5000
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
        modelName: 'post'
    })

    return Post
}
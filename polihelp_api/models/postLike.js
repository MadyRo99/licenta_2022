'use strict'

const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class PostLike extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    PostLike.init({
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
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'posts',
                key: 'id',
                onDelete: 'cascade'
            }
        }
    }, {
        sequelize,
        modelName: 'post_likes',
        timestamps: false
    })

    return PostLike
}
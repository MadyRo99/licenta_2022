'use strict'

const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      length: 50
    },
    lastName: {
      type: DataTypes.STRING,
      length: 50
    },
    email: {
      type: DataTypes.STRING,
      length: 100,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
        onDelete: 'cascade'
      }
    },
    facultyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'faculties',
        key: 'id',
        onDelete: 'cascade'
      }
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
    modelName: 'user'
  })

  return User
}
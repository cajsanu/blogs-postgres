const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Author = require("./Author")

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER, 
    validate: {
      max: 2024,
      min: 1991
    }
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
})

module.exports = Blog
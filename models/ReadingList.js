const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class UserReadingList extends Model {}

UserReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
  },
  {
    sequelize,
    tableName: "user_reading_list",
    underscored: true,
    timestamps: false,
    modelName: "user_reading_list",
  }
);

module.exports = UserReadingList;

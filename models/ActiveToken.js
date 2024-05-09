const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class ActiveToken extends Model {}
ActiveToken.init(
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
    activeToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "active_token",
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "active_token",
  }
);

module.exports = ActiveToken;

const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("reads", "blog_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("reads", "blog_id");
  },
};

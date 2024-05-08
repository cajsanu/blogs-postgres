const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("user_reading_list", "is_read", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("user_reading_list", "is_read");
  },
};

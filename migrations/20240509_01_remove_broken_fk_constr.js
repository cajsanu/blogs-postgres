const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('blogs', 'blogs_user_id_fkey')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface
    .addConstraint('blogs', {
      type: 'FOREIGN KEY',
      fields: ['user_id'],
      references: { table: "blogs", field: "id" },
      name: 'blogs_user_id_fkey',
    })
  },
};

const Blog = require("./Blog");
const User = require("./User");
// const Author = require("./Author")

User.hasMany(Blog);
Blog.belongsTo(User);
// Author.hasMany(Blog)

// Blog.sync({ alter: true });
// User.sync({ alter: true });
// Author.sync({ alter: true})

module.exports = {
  Blog,
  User,
  // Author
};

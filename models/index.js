const Blog = require("./Blog");
const User = require("./User");
// const Author = require("./Author")
const UserReadingList = require("./ReadingList");

User.hasMany(Blog);
Blog.belongsTo(User);
// Author.hasMany(Blog)

User.belongsToMany(Blog, { through: UserReadingList, as: "marked_blogs" });
Blog.belongsToMany(User, { through: UserReadingList, as: "users_marked" });

module.exports = {
  Blog,
  User,
  // Author
  UserReadingList,
};

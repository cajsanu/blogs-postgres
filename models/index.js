const Blog = require("./Blog");
const User = require("./User");
// const Author = require("./Author")
const UserReadingList = require("./ReadingList");
// const Reads = require("./Reads")

User.hasMany(Blog);
Blog.belongsTo(User);
// Author.hasMany(Blog)

// Reads.belongsToMany(Blog, {through: "Read_blog"})
// Blog.belongsToMany(Reads, {through: "Read_blog"})

User.belongsToMany(Blog, { through: UserReadingList, as: "marked_blogs" });
Blog.belongsToMany(User, { through: UserReadingList, as: "users_marked" });

module.exports = {
  Blog,
  User,
  // Author
  UserReadingList,
  // Reads
};

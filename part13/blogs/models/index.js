const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog, { foreignKey: { name: "user_id" } });
Blog.belongsTo(User, { foreignKey: { name: "user_id" } });




module.exports = {
  Blog,
  User,
};

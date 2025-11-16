const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog, { foreignKey: { name: "user_id" } });
Blog.belongsTo(User, { foreignKey: { name: "user_id" } });


User.sync({ alter: true })
Blog.sync({ alter: true })


module.exports = {
  Blog,
  User,
};

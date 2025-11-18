const Blog = require("./blog");
const ReadingList = require("./readingList");
const User = require("./user");

User.hasMany(Blog, { foreignKey: { name: "user_id" } });
Blog.belongsTo(User, { foreignKey: { name: "user_id" } });

User.belongsToMany(Blog, { 
  through: ReadingList, 
  as: 'readings',
  foreignKey: 'user_id',
  otherKey: 'blog_id'
});

Blog.belongsToMany(User, { 
  through: ReadingList, 
  as: 'users_reading',
  foreignKey: 'blog_id',
  otherKey: 'user_id'
});


module.exports = {
  Blog,
  User,
  ReadingList
};

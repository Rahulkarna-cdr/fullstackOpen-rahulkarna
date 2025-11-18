const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../utils/db.js')

class ReadingList extends Model {}
ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "reading_list",
  }
);

module.exports = ReadingList
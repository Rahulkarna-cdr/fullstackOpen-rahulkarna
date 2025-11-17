const { Model, DataTypes } = require("sequelize");
const {sequelize} = require('../utils/db.js')


class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: 1991,
          msg: 'Year must be greater than 1991'
        },
        max: {
          args: new Date().getFullYear(),
          msg: 'Year must be less than or equal to the current year'
        },
        isInt: {
          msg: 'Year must be an integer'
        }
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
);

module.exports= Blog
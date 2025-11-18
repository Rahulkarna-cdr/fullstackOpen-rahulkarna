const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../utils/db.js')

class Session extends Model {}
Session.init(
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
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "session",
  }
);

module.exports = Session
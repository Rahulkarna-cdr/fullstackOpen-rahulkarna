const {Model, DataTypes} = require("sequelize")
const {sequelize} = require('../utils/db.js')

class User extends Model {}
User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    username:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
               msg: "Username must be a valid email address"
            }
        }
    },
    password:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    disabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},{
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user"
}
);

module.exports= User

require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes} = require('sequelize')

const express = require("express")
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL,{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull : false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull : false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0

  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

app.get("/api/blogs", async(req,res)=>{
    const blogs = await Blog.findAll()
    res.status(200).json(blogs)
})


app.listen(process.env.PORT, ()=>{
    console.log(`server is running at PORT ${process.env.PORT}`)
})

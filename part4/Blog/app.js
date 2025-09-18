const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')
const app = express()


app.use(express.json())
app.use('/api/blogs', blogRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
console.log("connected to mongoDB")

module.exports = app
const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')
const userRouter = require('./controllers/userController')
const middleware = require('./middlewares/middleware')
const loginRouter = require('./controllers/loginController')
const app = express()

app.use(express.json())
app.use('/api/blogs',middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
console.log("connected to mongoDB")

app.use(middleware.unknownEndPoint)

app.use(middleware.errorHandler)

module.exports = app
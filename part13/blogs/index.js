const express = require("express");
const app = express();
const {PORT} = require('./utils/config')
const { connectToDatabase, sequelize } = require('./utils/db')
const errorHandler = require("./middlewares/errorHandler")

const blogRouter = require("./controllers/blogController")
const userRouter = require("./controllers/userController")
const loginRouter = require("./controllers/loginController")

app.use(express.json());

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(errorHandler)


const start = async () => {
  await connectToDatabase()
  await sequelize.sync()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
const express = require("express");
const app = express();
const { PORT } = require("./utils/config");
const {Sequelize} = require("sequelize");
const {Blog} = require("./models");
const { connectToDatabase, sequelize } = require("./utils/db");
const errorHandler = require("./middlewares/errorHandler");

const blogRouter = require("./controllers/blogController");
const userRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");
const readingListRouter = require("./controllers/readingListController")

require("./models");

app.use(express.json());

app.get("/api/authors",async (req,res)=>{
  try{
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "blogs"],
      [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"]
    ],
    group: ["author"],
    raw:true,
  })
  res.status(200).json(authors);}
  catch(error){
    res.status(500).json({error: error.message});
  }
})

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglists", readingListRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

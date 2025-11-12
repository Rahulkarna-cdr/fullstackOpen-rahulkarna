require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

Blog.sync()

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    const { author, url, title, likes } = req.body;
    if (!url || !title) {
      res.status(400).json({ error: "url and title are required" });
    }
    const blog = Blog.build({
      author,
      url,
      title,
      likes: likes || 0,
    });

    await blog.save();
    res.status(201).json({ msg: "blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});

app.delete("/api/blogs/:id", async (req,res)=>{
    try{
        const id = req.params.id
        const blog = Blog.findByPk(id)
        if(!blog){
            res.status(404).json({error: "Unable to find the blog"})
        }
        await Blog.destroy({where: {id}})

        res.status(200).json({msg: "successfully deleted the blog"})
    }
    catch(error){
        res.status(500).json({error: "Unable to delete the blog"})
    }
})

app.listen(process.env.PORT, () => {
  console.log(`server is running at PORT ${process.env.PORT}`);
});

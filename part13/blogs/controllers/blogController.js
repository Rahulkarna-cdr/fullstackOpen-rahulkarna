const blogRouter = require("express").Router();

const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
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

blogRouter.put("/:id",async (req,res)=>{
    try{
        const id = req.params.id
        const {likes} = req.body
        const blog = await Blog.findByPk(id)
        if(!blog){
            res.status(404).json({error: "unable to find the blog"})
        }
        blog.likes = likes
        await blog.save()
        res.status(200).json({msg: "successfully changed likes"})
    }
    catch(error){
        res.status(500).json({error: "unable to modify changes"})
    }
})

blogRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ error: "Unable to find the blog" });
    }
    await Blog.destroy({ where: { id } });

    res.status(200).json({ msg: "successfully deleted the blog" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the blog" });
  }
});

module.exports = blogRouter;

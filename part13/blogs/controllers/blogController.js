const blogRouter = require("express").Router();

const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
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
});

blogRouter.put("/:id",async (req,res)=>{
        const id = req.params.id
        const {likes} = req.body
        const blog = await Blog.findByPk(id)
        if(!blog){
            res.status(404).json({error: "unable to find the blog"})
        }
        blog.likes = likes
        await blog.save()
        res.status(200).json({msg: "successfully changed likes"})
})

blogRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.status(404).json({ error: "Unable to find the blog" });
    }
    await Blog.destroy({ where: { id } });

    res.status(200).json({ msg: "successfully deleted the blog" });
});

module.exports = blogRouter;

const blogRouter = require("express").Router();
const tokenExtractor = require('../middlewares/authMiddleware')

const {Blog, User} = require("../models");
const { Op } = require("sequelize");

blogRouter.get("/", async (req, res) => {
  const where = {};

  if(req.query.search){
  const search = `%${req.query.search}%`

    where[Op.or] = [
      { title: { [Op.iLike]: search } },
      { author: { [Op.iLike]: search } }
    ];
  }
  const blogs = await Blog.findAll({
    where,
    attributes: { exclude: ["user_id"] },
    include: {
      model: User,
      attributes: ["name", "username"]
    },
    order: [["likes", "DESC"]],
  });
  res.status(200).json(blogs);
});

blogRouter.post("/",tokenExtractor, async (req, res) => {
    const { author, url, title, likes } = req.body;
    if (!url || !title) {
      return res.status(400).json({ error: "url and title are required" });
    }
    const blog = Blog.build({
      author,
      url,
      title,
      likes: likes || 0,
      user_id: req.user.id
    });

    await blog.save();
    res.status(201).json({ msg: "blog created successfully", blog });
});

blogRouter.put("/:id",async (req,res)=>{
        const id = req.params.id
        const {likes} = req.body
        const blog = await Blog.findByPk(id)
        if(!blog){
            return res.status(404).json({error: "unable to find the blog"})
        }
        blog.likes = likes
        await blog.save()
        res.status(200).json({msg: "successfully changed likes"})
})

blogRouter.delete("/:id",tokenExtractor, async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Unable to find the blog" });
    }
    if(blog.user_id!==req.user.id){
      return res.status(403).json({error:"only own blogs can be deleted"})
    }
    await Blog.destroy();

    res.status(200).json({ msg: "successfully deleted the blog" });
});

module.exports = blogRouter;

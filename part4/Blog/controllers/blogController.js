const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.status(200).json(blogs);
});

blogRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const newBlog = new Blog(body);

    if (!newBlog.title || !newBlog.url) {
      return response
        .status(400)
        .json({ error: "url and title both are required" });
    }

    const savedBlog = await newBlog.save();

    const user = await User.findById(body.user);

    if (!user) {
      throw new Error("User not found");
    }

    user.blogs = user.blogs.concat(savedBlog.id);

    await user.save();

    response.status(201).json(savedBlog);

  } catch (error) {
    console.error("Error creating blog:", error.message);
    response
      .status(500)
      .json({ error: "Something went wrong while creating the Blog." });
  }
});


blogRouter.delete("/:id", async (request, response) => {
  const blogID = request.params.id;
  const blog = await Blog.findById(blogID);

  try {
    if (blog.user.toString() !== request.user.id.toString()) {
      return response
        .status(403)
        .json({ error: "You can't delete others blogs" });
    }

    await blog.deleteOne();
    response.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "something went wrong" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;
  try{
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true, runValidators: true }
  );
  response.status(200).json(updatedBlog);
}
catch(error){
  response.status(400).json({error: error.message})
}
});

module.exports = blogRouter;

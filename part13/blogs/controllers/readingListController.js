const readingListRouter = require("express").Router();
const { ReadingList, Blog, User } = require("../models");

readingListRouter.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  if (!blogId || !userId) {
    return res.status(400).json({ error: "blogId and userId are required" });
  }

  try {
    // Check if blog and user exist
    const blog = await Blog.findByPk(blogId);
    const user = await User.findByPk(userId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already in reading list
    const existing = await ReadingList.findOne({
      where: { user_id: userId, blog_id: blogId }
    });

    if (existing) {
      return res.status(400).json({ error: "Blog already in reading list" });
    }

    // Add to reading list
    const readingListItem = await ReadingList.create({
      user_id: userId,
      blog_id: blogId,
      read: false
    });

    res.status(201).json(readingListItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = readingListRouter;
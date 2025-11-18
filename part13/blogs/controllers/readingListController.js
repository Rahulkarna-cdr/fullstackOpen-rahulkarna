const readingListRouter = require("express").Router();
const tokenExtractor = require("../middlewares/authMiddleware");
const { ReadingList, Blog, User } = require("../models");

readingListRouter.post("/", async (req, res) => {
  const { blogId, userId } = req.body;

  if (!blogId || !userId) {
    return res.status(400).json({ error: "blogId and userId are required" });
  }

  try {
    const blog = await Blog.findByPk(blogId);
    const user = await User.findByPk(userId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existing = await ReadingList.findOne({
      where: { user_id: userId, blog_id: blogId }
    });

    if (existing) {
      return res.status(400).json({ error: "Blog already in reading list" });
    }

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

readingListRouter.put("/:id", tokenExtractor, async (req, res) => {
    const id = req.params.id;  
    const { read } = req.body;
  
    if (read === undefined) {
      return res.status(400).json({ error: "read field is required" });
    }
  
    if (typeof read !== 'boolean') {
      return res.status(400).json({ error: "read must be a boolean" });
    }
  
    try {
      const readingListItem = await ReadingList.findByPk(id);
  
      if (!readingListItem) {
        return res.status(404).json({ error: "Reading list entry not found" });
      }
  
      if (readingListItem.user_id !== req.user.id) {
        return res.status(403).json({ error: "You can only mark your own reading list items as read" });
      }
  
      readingListItem.read = read;
      await readingListItem.save();
  
      res.status(200).json(readingListItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = readingListRouter;
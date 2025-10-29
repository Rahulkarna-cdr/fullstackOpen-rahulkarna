const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const saltRounds = 10;

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {url:1,title:1,author:1,id:1});
  res.status(200).send(users);
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body;
    //username validation
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "user already exists" });
    }
    if (!username) {
      return res.status(400).json({ error: "username is required" });
    }
    if (username.length < 3) {
      return res.status(400).json({ error: "username is too short" });
    }

    //password validation
    if (!password) {
      return res.status(400).json({ error: "password is required" });
    }
    if (password.length < 3) {
      return res.status(400).json({ error: "Password must be at least 3 characters long" });
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = userRouter;

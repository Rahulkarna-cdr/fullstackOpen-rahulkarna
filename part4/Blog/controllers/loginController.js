const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const saltRounds = 10;

loginRouter.post("/", async (req, res) => {
  //user sends username and password to the server
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    //server verifies the credentials
    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).json({error:"invalid user"})
    }
    const isPasswordValid = user.password === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    

    //server generates the token
    const payload = { username: user.username, id: user.id };
    const webtoken = jwt.sign(payload, process.env.SECRET_KEY);

    //server sends the token to the frontend/client
    if (!webtoken) {
      return res.status(401).json({ error: "token not provided" });
    }
    res
      .status(200)
      .json({token: webtoken, username: user.username, name:user.name, id:user.id });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = loginRouter;

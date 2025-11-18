const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const { Session, User } = require("../models");
const tokenExtractor = require("../middlewares/authMiddleware");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({ err: "user not found" });
  }

  if (user.disabled) {
    return res.status(403).json({ err: "Account is disabled" });
  }

  if (user.password !== password) {
    return res.status(400).json({ err: "Invalid credentials" });
  }

  const payload = { username: user.username, id: user.id };
  const token = jwt.sign(payload, SECRET_KEY);

  await Session.create({ token, user_id: user.id });
  return res.status(200).json(token);
});


loginRouter.delete("/logout", tokenExtractor, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]

    if(!token){
        return res.status(401).json({err: "token Invalid or Expired"})
    }

   await Session.destroy({where:{token}})

   return res.status(200).json({msg: "Logged out successfully"})
})

module.exports = loginRouter;

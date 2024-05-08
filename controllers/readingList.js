const router = require("express").Router();
const { UserReadingList, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.post("/", async (req, res) => {
  const { userId, blogId } = req.body;
  const newMark = await UserReadingList.create({
    userId,
    blogId,
  });
  res.json(newMark);
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const markedBlog = await UserReadingList.findByPk(req.params.id);
    if (markedBlog.userId === user.id) {
      markedBlog.isRead = req.body.read;
      await markedBlog.save();
      res.json(markedBlog);
    } else {
      res.send({error: "Blog not in reading list"})
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

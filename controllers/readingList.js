const router = require("express").Router();
const { UserReadingList } = require("../models")

router.post("/", async (req, res) => {
  const { userId, blogId } = req.body;
  const newMark = await UserReadingList.create({
    userId,
    blogId
  })
  res.json(newMark);
});

module.exports = router;
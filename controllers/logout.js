const router = require("express").Router();
const { ActiveToken } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.delete("/", tokenExtractor, async (req, res) => {
  try {
    const token = req.activeToken;
    const activeToken = await ActiveToken.findOne({
      where: {
        activeToken: token.activeToken,
      },
    });
    await activeToken.destroy();
    res.send("Successfully logged out");
  } catch (error) {
    res.send({ error: "Could not log out" });
  }
});

module.exports = router;

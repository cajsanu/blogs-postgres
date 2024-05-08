const router = require("express").Router();
const { Blog, User } = require("../models");
// const { Reads } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId", "createdAt", "updatedAt", "date"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.isRead) {
    where.isRead = req.query.isRead === "true";
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt", "date", "read"],
        },
      },
      {
        model: Blog,
        as: "marked_blogs",
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt", "date", "read"],
        },
        through: {
          as: "status",
          attributes: ["id", "isRead"],
          where,
        },
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

// router.put("/:username", async (req, res) => {
//   const user = await User.findOne({
//     where: { username: req.params.username },
//   });
//   const username = req.body.username;
//   if (user) {
//     user.username = username;
//     await user.save();
//     res.json(user);
//   } else {
//     res.status(404).end();
//   }
// });

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;

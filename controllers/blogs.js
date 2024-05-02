const router = require("express").Router();
const { Blog } = require("../models");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { Op } = require("sequelize");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(JSON.stringify(blogs));
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.json(blog.toJSON());
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  if (blog.userId === user.id) {
    try {
      await blog.destroy();
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(400).json({ error: "Action not permitted" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    console.log(blog);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

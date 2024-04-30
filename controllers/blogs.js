const router = require("express").Router();
const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(blogs);
  res.json(JSON.stringify(blogs));
});

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog.toJSON());
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  try {
    await blog.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
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
    next(error)
  }
});

module.exports = router;

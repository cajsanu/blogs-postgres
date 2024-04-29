const router = require("express").Router();
const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(blogs);
  res.json(JSON.stringify(blogs));
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog.toJSON());
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  try {
    await blog.destroy();
    return res.status(200);
  } catch (error) {
    // next(error)
    res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log(blog);
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

module.exports = router;

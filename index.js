const express = require("express");
const app = express();
const { errorHandler } = require("./utils/middleware");

const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const readingListRouter = require("./controllers/readingList");
const logoutRouter = require("./controllers/logout");
// const authorRouter = require("./controllers/authors")

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/readinglists", readingListRouter);
app.use("/api/logout", logoutRouter);
// app.use("api/authors", authorRouter)
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

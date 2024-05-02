const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "TypeError") {
    return response.status(400).send({ error: "no matching id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "SequelizeValidationError") {
    return response
      .status(400)
      .send({ error: "Validation isEmail on username failed" });
  }

  next(error);
};

module.exports = errorHandler;

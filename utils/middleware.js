const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const { ActiveToken } = require("../models");

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
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET);
      const activeToken = await ActiveToken.findOne({
        where: {
          activeToken: authorization.substring(7),
        },
      });
      if (activeToken) {
        req.decodedToken = decodedToken;
        req.activeToken = activeToken
      } else {
        throw new Error("Token not valid")
      }
    } catch (error) {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };

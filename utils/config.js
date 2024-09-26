import { ENV } from "./env"

module.exports = {
  DATABASE_URL: ENV.DATABASE_URL,
  SECRET: ENV.SECRET,
  PORT: process.env.PORT || 3001,
}
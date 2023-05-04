const mongoose = require("mongoose");
const logger = require("../middleware/logger");

mongoose
  .connect("mongodb://localhost:27017/project_1")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    logger.debug("Failed to connect the database", err);
  });

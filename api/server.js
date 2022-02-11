const express = require("express");
const {
  logger,
  validateActions,
  validateActionsId,
} = require("./actions/actions-middlware");

const {
  loggerP,
  validateProject,
  validateProjectId,
} = require("./projects/projects-middleware");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;

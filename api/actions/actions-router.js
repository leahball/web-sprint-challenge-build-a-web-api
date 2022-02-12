const express = require("express");
const { validateActionId, validateAction } = require("./actions-middlware");

const Action = require("./actions-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});
//Returns an array of actions (or an empty array) as the body of the response.

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});
//Returns an action with the given `id` as the body of the response.
//If there is no action with the given `id` it responds with a status code 404.

router.post("/", validateActionId, (req, res, next) => {
  Action.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});
//Returns the newly created action as the body of the response.
//If the request body is missing any of the required fields it responds with a status code 400.
//When adding an action make sure the `project_id` provided belongs to an existing `project`.

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch(next);
});
//Returns the updated action as the body of the response.
//If there is no action with the given `id` it responds with a status code 404.
//If the request body is missing any of the required fields it responds with a status code 400.

router.delete("/:id", validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch(next);
});
//Returns no response body.
//If there is no action with the given `id` it responds with a status code 404.

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "uh oh something bad happened",
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;

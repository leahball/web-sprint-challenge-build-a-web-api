// Write your "actions" router here!
const express = require("express");

const router = express.Router();

router.get("/api/actions", (req, res) => {});
//`[GET] /api/actions`
//Returns an array of actions (or an empty array) as the body of the response.

router.get("/api/actions/:id", (req, res) => {});
//`[GET] /api/actions/:id`
//Returns an action with the given `id` as the body of the response.
//If there is no action with the given `id` it responds with a status code 404.

router.post("/api/actions", (req, res) => {});
//`[POST] /api/actions`
//Returns the newly created action as the body of the response.
//If the request body is missing any of the required fields it responds with a status code 400.
//When adding an action make sure the `project_id` provided belongs to an existing `project`.

router.put("/api/actions/:id", (req, res) => {});
//`[PUT] /api/actions/:id`
//Returns the updated action as the body of the response.
//If there is no action with the given `id` it responds with a status code 404.
//If the request body is missing any of the required fields it responds with a status code 400.

router.delete("/api/actions/:id", (req, res) => {});
//`[DELETE] /api/actions/:id`
//Returns no response body.
//If there is no action with the given `id` it responds with a status code 404.

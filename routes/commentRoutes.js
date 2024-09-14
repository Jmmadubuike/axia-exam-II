const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.createComment);

router.get("/", commentController.getAllComments);

router.get("/post/:postId", commentController.getCommentsByPostId);

module.exports = router;

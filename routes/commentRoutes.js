const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Create a comment
router.post("/", commentController.createComment);

// Get all comments
router.get("/", commentController.getAllComments);

// Get comments for a specific post
router.get("/post/:postId", commentController.getCommentsByPostId);

module.exports = router;

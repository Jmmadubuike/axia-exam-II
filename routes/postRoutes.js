// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Define routes
router.post('/create', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/like/:id', postController.likePost);
router.put('/dislike/:id', postController.dislikePost);

module.exports = router;

// controllers/postController.js
const Post = require("../models/Post");

// Create a post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", ["username"]);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", [
      "username",
    ]);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.body.userId;

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      if (post.dislikes.includes(userId)) {
        post.dislikes = post.dislikes.filter((id) => id !== userId);
      }
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Dislike a post
exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.body.userId;

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter((id) => id !== userId);
    } else {
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((id) => id !== userId);
      }
      post.dislikes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    const comment = new Comment({
      content,
      user: userId,
      post: postId
    });
    
    await comment.save();
    res.status(201).json({ message: 'Comment created', comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Get all comments along with associated post and creator
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('post')
      .populate('user', 'name'); // Return only the name of the user

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

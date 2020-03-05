const express = require('express');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById
} = require('./posts.controller');

const router = express.Router();

router.get('', getAllPosts);
router.get('/:id', getPostById);
router.put('', updatePostById);
router.post('', createPost);
router.delete('', deletePostById);

module.exports = {
  postsRouter: router
};

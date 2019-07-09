const Post = require('../models/post.model');

module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    text: req.body.text,
    imageUrl: `/${req.file.filename}`
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.updatePost = async (req, res) => {
  const $set = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    text: req.body.text
  };
  try {
    const post = await Post.findOneAndUpdate({_id: req.params.id}, $set, {new: true});
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.getByTitle = async (req, res) => {
  try {
    const posts = await Post.find({title: new RegExp('^' + req.body.title + '$', 'i')});
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
};

const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');

module.exports.deleteAccount = async (req, res) => {
  try {
    await User.deleteOne({_id: req.params.id});
    res.json({message: 'Пост удален'})
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.checkPassword = async (req, res) => {
  try {
    const candidate = await User.findOne({_id: req.params.id});
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password);

    res.json(isPasswordCorrect)
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const candidate = await User.findOne({_id: req.params.id});
    const salt = bcrypt.genSaltSync(10);
    candidate.password = bcrypt.hashSync(req.body.newPassword, salt);
    const $set = {password: bcrypt.hashSync(req.body.newPassword, salt)};
    await User.findOneAndUpdate({_id: req.params.id}, $set, {new: true});

    res.json(201)
  } catch (e) {
    res.status(500).json(e)
  }
};

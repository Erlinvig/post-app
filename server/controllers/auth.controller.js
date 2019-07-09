const bcrypt = require('bcrypt-nodejs');
const keys = require('../keys');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login});

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT);
      res.json({token, user: candidate});
    } else {
      res.status(401).json({message: 'Пароль не верен'})
    }
  } else {
    res.status(404).json({message: 'Пользователь не найден'})
  }
};

module.exports.registration = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login});

  if (candidate) {
    res.status(409).json({message: 'Логин занят!'})
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    });

    await user.save();
    res.status(201).json(user)
  }
};

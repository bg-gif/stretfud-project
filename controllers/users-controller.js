const {
  fetchUserById,
  postUserMod,
  updateUserByUsername
} = require('../models/users-model.js');

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const user = req.body;
  postUserMod(user)
    .then(newUser => {
      res.status(201).send({ user: newUser });
    })
    .catch(next);
};

exports.patchUserByUsername = (req, res, next) => {
  const username = req.params.username;
  const update = req.body;
  updateUserByUsername(username, update)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

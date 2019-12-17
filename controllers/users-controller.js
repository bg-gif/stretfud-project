const {
  fetchUserById,
  postUserMod,
  updateUserByUsername,
  fetchOrders
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

exports.getOrders = (req, res, next) => {
  const { username } = req.params;
  Promise.all([fetchOrders(username), fetchUserById(username)])
    .then(([orders, user]) => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: 'Not Found' });
      res.status(200).send({ orders });
    })
    .catch(next);
};

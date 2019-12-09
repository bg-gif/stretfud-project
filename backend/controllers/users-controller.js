const { fetchUserById, postUserMod } = require("../models/users-model.js");

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  fetchUserById(username)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  let user = req.body;
  postUserMod(user)
    .then(newUser => {
      console.log(newUser, "<<<<<<<<<newuser in controller");
      res.status(201).send({ user: newUser });
    })
    .catch(next);
};

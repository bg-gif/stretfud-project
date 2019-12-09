const connection = require("../db/connection");

exports.fetchUserById = username => {
  return connection("users")
    .select("*")
    .where({ username })
    .then(response => {
      return response.length === 0
        ? Promise.reject({ status: 404, msg: "User Does Not Exist" })
        : response;
    });
};

exports.postUserMod = user => {
  return connection("users")
    .insert(user)
    .returning("*")
    .then(user => {
      return user[0];
    });
};

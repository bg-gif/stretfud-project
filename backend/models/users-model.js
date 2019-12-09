const connection = require('../db/connection');

exports.fetchUserById = username => {
  return connection('users')
    .select('*')
    .where({ username })
    .then(response => {
      return response.length === 0
        ? Promise.reject({ status: 404, msg: 'User Does Not Exist' })
        : response;
    });
};

exports.postUserMod = user => {
  return connection('users')
    .insert(user)
    .returning('*')
    .then(([user]) => {
      return user;
    });
};

exports.updateUserByUsername = (username, update) => {
  const { phone_num, email } = update;
  return connection('users')
    .where({ username })
    .modify(query => {
      if (phone_num) query.update({ phone_num });
      if (email) query.update({ email });
    })
    .returning('*');
};

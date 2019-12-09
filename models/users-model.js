const connection = require('../db/connection');

exports.fetchUserById = username => {
  return connection('users')
    .select('username', 'realname', 'phone_num', 'email', 'age')
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
    .returning('username', 'realname', 'phone_num', 'email', 'age')
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

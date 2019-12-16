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
    .returning('*')
    .then(([user]) => {
      const { username, realname, phone_num, email, age, created_at } = user;
      return { username, realname, phone_num, email, age, created_at };
    });
};

exports.fetchUserInfo = username => {
  return connection('users')
    .select('username', 'password')
    .where({ username });
};

exports.updateUserByUsername = (username, update) => {
  const { phone_num, email } = update;
  if (!email && !phone_num) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return connection('users')
    .where({ username })
    .modify(query => {
      if (phone_num) query.update({ phone_num });
      if (email) query.update({ email });
    })
    .returning('*')
    .then(([user]) => {
      const { username, realname, phone_num, email, age } = user;
      return { username, realname, phone_num, email, age };
    });
};

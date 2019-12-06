const connection = require('../db/connection');

exports.fetchUserById = user_id => {
  return connection('users')
    .select('*')
    .where({ user_id })
    .then(response => {
      return response.length === 0
        ? Promise.reject({ status: 404, msg: 'User Does Not Exist' })
        : response;
    });
};

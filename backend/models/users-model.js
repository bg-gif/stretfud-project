const connection = require('../db/connection');

exports.fetchUserById = user_id => {
  return connection('users')
    .select('*')
    .where({ user_id })
    .then(response => {
      console.log(response.length);
      return response.length === 0
        ? Promise.reject({ status: 404, msg: 'Not Found' })
        : response;
    });
};

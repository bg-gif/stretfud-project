const { fetchUserInfo } = require('../models/users-model');
const { fetchVendorInfo } = require('../models/vendors-model');

exports.checkUserPassword = (req, res, next) => {
  const { username, password } = req.body;
  fetchUserInfo(username)
    .then(([response]) => {
      if (!response) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return password === response.password
        ? res.status(200).send({ msg: 'Verified' })
        : Promise.reject({ status: 400, msg: 'Bad Request' });
    })
    .catch(next);
};

exports.checkVendorPassword = (req, res, next) => {
  const { username, password } = req.body;

  fetchVendorInfo(username)
    .then(([response]) => {
      if (!response) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return password === response.password
        ? res.status(200).send({ msg: 'Verified' })
        : Promise.reject({ status: 400, msg: 'Bad Request' });
    })
    .catch(next);
};

const uploadFile = require('../models/upload-model');

exports.sendPhoto = (req, res, next) => {
  const { uri } = req.body;
  console.log(uri);
  uploadFile(uri).then(response => {
    res.status(200).send('confirmed');
  });
};

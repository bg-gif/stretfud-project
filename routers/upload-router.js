const fs = require('fs');
const AWS = require('aws-sdk');
const { SECRET, ID, BUCKET_NAME } = require('../private/config');

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = filename => {
  const fileContent = fs.readFileSync('private/file.jpg');
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'test.jpg',
    Body: fileContent
  };
  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File Uploaded successfully. ${data.Location}`);
  });
};

module.exports = uploadFile;

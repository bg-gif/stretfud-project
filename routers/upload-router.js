const fs = require('fs');
const AWS = require('aws-sdk');

const { S3_SECRET, S3_KEY, S3_BUCKET_NAME } = process.env;

const s3 = new AWS.S3({
  accessKeyId: S3_KEY,
  secretAccessKey: S3_SECRET
});

const uploadFile = filename => {
  const fileContent = fs.readFileSync('');
  const params = {
    Bucket: S3_BUCKET_NAME,
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

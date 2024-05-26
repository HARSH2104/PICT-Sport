const crypto = require('crypto');

const generateAccessTokenSecret = () => {
  const length = 32; // length of the secret key in bytes
  return crypto.randomBytes(length).toString('hex');
}

const accessTokenSecret = generateAccessTokenSecret();
console.log('Access Token Secret:', accessTokenSecret);

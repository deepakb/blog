const jwt = require('jsonwebtoken');

const { appSecret } = require('../configs');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const sendFalseHeader = () => {
    req.isAuth = false;
    return next();
  };

  if (!authHeader) {
    sendFalseHeader();
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    sendFalseHeader();
  }

  let hashToken;

  try {
    hashToken = await jwt.verify(token, appSecret);
  } catch (error) {
    sendFalseHeader();
  }

  if (!hashToken) {
    sendFalseHeader();
  }

  req.isAuth = true;
  req.userId = hashToken.userId;
  next();
};

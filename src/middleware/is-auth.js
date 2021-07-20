const jwt = require('jsonwebtoken');

const { appSecret } = require('../configs');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.Authorization;
  const sendFalseHeader = () => {
    req.isAuth = false;
    return next();
  };

  if (!authHeader) {
    return sendFalseHeader();
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    return sendFalseHeader();
  }

  let hashToken;

  try {
    hashToken = await jwt.verify(token, appSecret);
  } catch (error) {
    return sendFalseHeader();
  }

  if (!hashToken) {
    return sendFalseHeader();
  }

  req.isAuth = true;
  req.userId = hashToken.userId;
  next();
};

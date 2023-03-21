const jwt = require('jsonwebtoken');

const verifyUserToken = (req, res, next) => {
  const reqToken = req.headers.authorization;
  if (!reqToken) {
    return res.status(401).send('User Unauthorized');
  }

  try {
    const decodedValue = jwt.verify(reqToken, process.env.PRIVATEKEY);
    req.user = decodedValue;
    next();
  } catch (err) {
    return res.status(401).send('User Unauthorized');
  }
};

const Auth = {
    verifyUserToken
};

module.exports = Auth;
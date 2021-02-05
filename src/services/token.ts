import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '@provi/config';

const generateToken = (userId, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessToken = generateToken(user.id);

  return {
    access: {
      token: accessToken,
    },
  };
};

export default {
  generateToken,
  generateAuthTokens,
};

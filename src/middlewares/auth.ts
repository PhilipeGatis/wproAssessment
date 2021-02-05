import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '@provi/common/ApiError';
import logger from '@provi/common/logger';

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  resolve();
};

export default () => async (req, res, next) => {
  logger.debug('Validate Auth: ', req.body);
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

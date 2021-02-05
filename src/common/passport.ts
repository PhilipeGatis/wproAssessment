import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '@provi/config';
import User from '@provi/models/User';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export default new JwtStrategy(jwtOptions, jwtVerify);

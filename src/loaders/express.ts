import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import { Application, Request, Response, json, NextFunction, urlencoded } from 'express';
import { errorConverter, errorHandler } from '@provi/middlewares/error';
import jwtStrategy from '@provi/common/passport';
import passport from 'passport';
import ApiError from '@provi/common/ApiError';
import * as morgan from '@provi/common/morgan';
import routes from '@provi/routes';
import httpStatus from 'http-status';
import logger from '@provi/common/logger';

import config from '@provi/config';

export default (app: Application) => {
  if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
  }

  // set security HTTP headers
  app.use(helmet());

  // parse urlencoded request body
  app.use(urlencoded({ extended: true }));

  // parse json request body
  app.use(json());

  // sanitize request data
  app.use(xss());
  app.use(mongoSanitize());

  // gzip compression
  app.use(compression());

  // enable cors
  app.use(cors());
  app.options('*', cors());

  // jwt authentication
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);

  // init API routes
  app.use(config.api.prefix, routes());

  // send back a 404 error for any unknown api request
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  logger.info('express initialized');

  return app;
};

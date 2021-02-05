import { Router } from 'express';
import userRoute from '@provi/routes/user';
import authRoute from '@provi/routes/auth';
import docsRoute from '@provi/routes/docs';

export default () => {
  const app = Router();

  app.use('/auth', authRoute(app));
  app.use('/user', userRoute(app));
  app.use('/docs', docsRoute(app));

  return app;
};

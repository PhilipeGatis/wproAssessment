import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '@provi/docs/swaggerDef';

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/*.ts'],
});

export default (router: Router) => {
  router.use('/', swaggerUi.serve);
  router.get(
    '/',
    swaggerUi.setup(specs, {
      explorer: true,
    }),
  );
  return router;
};

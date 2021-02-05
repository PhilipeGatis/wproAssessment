import config from '@provi/config';
import app from '@provi/app';
import logger from '@provi/common/logger';

(async () => {
  const server = await app();
  server.listen(config.port, (err) => {
    if (err) {
      logger.error(`Error during server startup ${err.toString()}`);
    }
    logger.info(`Your server is ready on port ${config.port}`);
  });
})();

import config from '@provi/config';

export default {
  openapi: '3.0.0',
  servers: [
    {
      url: `http://localhost:${config.port}${config.api.prefix}`,
    },
  ],
};

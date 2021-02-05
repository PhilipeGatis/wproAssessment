import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  dotenvSafe.config({
    path: path.join(cwd, '/.env'),
    sample: path.join(cwd, '/.env.sample'),
  });
} else if (NODE_ENV === 'development' || NODE_ENV === 'test') {
  dotenvSafe.config({
    path: path.join(cwd, '/.env.dev'),
    sample: path.join(cwd, '/.env.sample'),
  });
}

const {
  LOG_LEVEL = 'info',
  PORT = 3001,
  DATABASE_HOST = '127.0.0.1',
  DATABASE_PORT = '27017',
  DATABASE_AUTH_USER = 'provi',
  DATABASE_AUTH_PASSWORD = 'provi',
  JWT_SECRET = 'r4yw2!',
} = process.env;

type AppConfig = {
  [key: string]: any;
};

const appConfig: AppConfig = {
  env: NODE_ENV,
  /**
   * Your favorite port
   */
  //   port: parseInt(PORT as string, 10),
  port: Number(PORT),
  host: 'localhost',
  scheme: 'http',

  /**
   * Used by winston logger
   */
  logs: {
    level: LOG_LEVEL,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },
  /**
   * Jwt configs
   */
  jwt: {
    secret: JWT_SECRET,
  },

  /**
   * DATABASE configs
   */
  database: {
    url: `mongodb://${DATABASE_AUTH_USER}:${DATABASE_AUTH_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export default appConfig;

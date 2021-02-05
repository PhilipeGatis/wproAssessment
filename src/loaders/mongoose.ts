import { connect } from 'mongoose';
import config from '@provi/config';
import logger from '@provi/common/logger';

export default async () => {
  logger.info('Init database connection');
  await connect(config.database.url, config.database.options);
  logger.info('database connection finished');
};

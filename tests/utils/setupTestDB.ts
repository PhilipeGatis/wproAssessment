import mongoose from 'mongoose';
import config from '@provi/config';

export default () => {
  beforeAll(async () => {
    await mongoose.connect(config.database.url, config.database.options);
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()),
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

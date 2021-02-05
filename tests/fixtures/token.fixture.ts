import tokenService from '@provi/services/token';
import { userOne } from '@test/fixtures/user.fixture';

const userOneAccessToken = tokenService.generateToken(userOne._id);

export { userOneAccessToken };

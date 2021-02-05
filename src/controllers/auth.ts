import httpStatus from 'http-status';
import catchAsync from '@provi/common/catchAsync';
import authService from '@provi/services/auth';
import userService from '@provi/services/user';
import tokenService from '@provi/services/token';

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export { register, login };

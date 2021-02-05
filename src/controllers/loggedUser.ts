import catchAsync from '@provi/common/catchAsync';
import userService from '@provi/services/user';

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserByEmail(req.user.email, {
    ...req.body,
    flow: { lastFlow: req.currentFlow },
  });
  res.send(user);
});

export { updateUser };

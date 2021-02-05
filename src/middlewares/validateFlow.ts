import httpStatus from 'http-status';
import ApiError from '@provi/common/ApiError';

export default async (req, res, next) => {
  const { flow } = req.user;
  const { flowList, lastFlow = '' } = flow;

  const currentPath = req.path.substr(1);

  if (!flowList.includes(currentPath)) {
    return next(
      new ApiError(
        httpStatus.BAD_REQUEST,
        `
          This "${currentPath}" endpoint not include in flow list:  ${flowList.join(',')}
          The last endpoint called is "${lastFlow}".
        `,
      ),
    );
  }

  if (
    flowList.indexOf(currentPath) !== flowList.indexOf(lastFlow) + 1 &&
    flowList.indexOf(currentPath) !== flowList.indexOf(lastFlow)
  ) {
    return next(
      new ApiError(
        httpStatus.BAD_REQUEST,
        `
          Cannot perform request for this "${currentPath}" endpoint.
          The last endpoint called is "${lastFlow}".
          Please follow the flow order: ${flowList.join(',')}
        `,
      ),
    );
  }
  Object.assign(req, { currentFlow: currentPath });
  return next();
};

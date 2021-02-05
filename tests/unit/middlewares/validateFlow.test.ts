import httpStatus from 'http-status';
import httpMocks from 'node-mocks-http';
import validateFlow from '@provi/middlewares/validateFlow';
import ApiError from '@provi/common/ApiError';
import { userOne } from '@test/fixtures/user.fixture';

describe('ValidateFlow middlewares', () => {
  describe('validate Flow', () => {
    test('should not return an error if lastFlow as empty and call first endpoint of flowList', () => {
      const path = 'cpf';
      userOne.flow.lastFlow = '';
      const req = httpMocks.createRequest({
        method: 'POST',
        path: `/${path}`,
        user: userOne,
      });
      const next = jest.fn();

      validateFlow(req, httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith();
    });

    test('should return an error if lastFlow as empty and not call the first endpoint of flowList', () => {
      const path = 'address';
      userOne.flow.lastFlow = '';
      const req = httpMocks.createRequest({
        method: 'POST',
        path: `/${path}`,
        user: userOne,
      });

      const error = new ApiError(
        httpStatus.BAD_REQUEST,
        `
          Cannot perform request for this "${path}" endpoint.
          The last endpoint called is "${userOne.flow.lastFlow}".
          Please follow the flow order: ${userOne.flow.flowList.join(',')}
        `,
      );

      const next = jest.fn();

      validateFlow(req, httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should return an error if lastFlow not includes on flowList', () => {
      const path = 'notInclude';
      userOne.flow.lastFlow = '';
      const req = httpMocks.createRequest({
        method: 'POST',
        path: `/${path}`,
        user: userOne,
      });

      const error = new ApiError(
        httpStatus.BAD_REQUEST,
        `
          This "${path}" endpoint not include in flow list:  ${userOne.flow.flowList.join(',')}
          The last endpoint called is "${userOne.flow.lastFlow}".
        `,
      );

      const next = jest.fn();

      validateFlow(req, httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should not return an error if user call last endpoint', () => {
      const path = 'cpf';
      const req = httpMocks.createRequest({
        method: 'POST',
        path: `/${path}`,
        user: userOne,
      });
      const next = jest.fn();

      validateFlow(req, httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith();
    });

    test('should return an error if user call next endpoint', () => {
      const path = 'full-name';
      const req = httpMocks.createRequest({
        method: 'POST',
        path: `/${path}`,
        user: userOne,
      });

      const error = new ApiError(
        httpStatus.BAD_REQUEST,
        `
          Cannot perform request for this "${path}" endpoint.
          The last endpoint called is "${userOne.flow.lastFlow}".
          Please follow the flow order: ${userOne.flow.flowList.join(',')}
        `,
      );

      const next = jest.fn();

      validateFlow(req, httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    test('should return an error if user call endpoint out of order', () => {
      const path = 'address';
      const req = httpMocks.createRequest({
        method: 'POST',
        path: `/${path}`,
        user: userOne,
      });
      const error = new ApiError(
        httpStatus.BAD_REQUEST,
        `
          Cannot perform request for this "${path}" endpoint.
          The last endpoint called is "${userOne.flow.lastFlow}".
          Please follow the flow order: ${userOne.flow.flowList.join(',')}
        `,
      );
      const next = jest.fn();

      validateFlow(req, httpMocks.createResponse, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

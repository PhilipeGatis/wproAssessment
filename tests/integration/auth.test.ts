import request from 'supertest';
import faker from 'faker';
import httpStatus from 'http-status';
import app from '@provi/app';
import setupTestDB from '@test/utils/setupTestDB';
import User from '@provi/models/User';
import { userOne, insertUsers } from '@test/fixtures/user.fixture';
import config from '@provi/config';

setupTestDB();

describe('Auth routes', () => {
  const apiPrefix = config.api.prefix;
  let server;
  beforeEach(async () => {
    server = await app();
  });
  describe(`POST /auth/register`, () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        fullName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
      };
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(server).post(`${apiPrefix}/auth/register`).send(newUser).expect(httpStatus.CREATED);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.tokens).toEqual({
        access: { token: expect.anything() },
      });

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({ fullName: newUser.fullName, email: newUser.email });

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything() },
      });
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(server).post(`${apiPrefix}/auth/register`).send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(server).post(`${apiPrefix}/auth/register`).send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';

      await request(server).post(`${apiPrefix}/auth/register`).send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(server).post(`${apiPrefix}/auth/register`).send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(server).post(`${apiPrefix}/auth/register`).send(newUser).expect(httpStatus.BAD_REQUEST);
    });
  });

  describe(`POST /auth/login`, () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(server).post(`${apiPrefix}/auth/login`).send(loginCredentials).expect(httpStatus.OK);

      expect(res.body.user).not.toHaveProperty('password');
      expect(res.body.tokens).toEqual({
        access: { token: expect.anything() },
      });
    });

    test('should return 401 error if there are no users with that email', async () => {
      const loginCredentials = {
        email: userOne.email,
        password: userOne.password,
      };

      const res = await request(server)
        .post(`${apiPrefix}/auth/login`)
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email or password' });
    });

    test('should return 401 error if password is wrong', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        email: userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(server)
        .post(`${apiPrefix}/auth/login`)
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect email or password' });
    });
  });
});

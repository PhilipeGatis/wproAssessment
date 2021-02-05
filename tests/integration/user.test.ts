import request from 'supertest';
import faker from 'faker';
import moment from 'moment';
import httpStatus from 'http-status';
import app from '@provi/app';
import setupTestDB from '../utils/setupTestDB';
import User from '@provi/models/User';
import { userOne, insertUsers } from '../fixtures/user.fixture';
import { userOneAccessToken } from '../fixtures/token.fixture';
import config from '@provi/config';

setupTestDB();

describe('User routes', () => {
  const apiPrefix = config.api.prefix;
  let server;
  beforeEach(async () => {
    server = await app();
  });
  describe('POST /user/cpf', () => {
    let data;
    test('should return 200 valid cpf', async () => {
      userOne.flow.lastFlow = '';
      await insertUsers([userOne]);

      data = {
        cpf: '48096454013',
      };

      const res = await request(server)
        .post(`${apiPrefix}/user/cpf`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('cpf', data.cpf);

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({ cpf: data.cpf });
    });

    test('should return 400 invalid cpf', async () => {
      userOne.flow.lastFlow = '';
      await insertUsers([userOne]);

      data = {
        cpf: '48096454012',
      };

      const res = await request(server)
        .post(`${apiPrefix}/user/cpf`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('POST /user/full-name', () => {
    let data;
    test('should return 200 valid full-name and validate fullName is virtual and firstName and lastName persisted', async () => {
      userOne.flow.lastFlow = 'full-name';
      await insertUsers([userOne]);

      data = {
        fullName: 'Mary Poppins',
      };

      const parts = data.fullName.split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ');

      const res = await request(server)
        .post(`${apiPrefix}/user/full-name`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('fullName', data.fullName);

      const dbUser = await User.findById(res.body.id).lean();
      expect(dbUser).toBeDefined();
      expect(dbUser).toHaveProperty('firstName', firstName);
      expect(dbUser).toHaveProperty('lastName', lastName);
      expect(dbUser).not.toHaveProperty('fullName', data.fullName);
    });
  });

  describe('POST /user/birthday', () => {
    let data;
    test('should return 200', async () => {
      userOne.flow.lastFlow = 'birthday';
      await insertUsers([userOne]);

      data = {
        birthday: moment().toJSON(),
      };

      const res = await request(server)
        .post(`${apiPrefix}/user/birthday`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('birthday', data.birthday);

      const dbUser = await User.findById(res.body.id).lean();
      expect(dbUser).toBeDefined();
      expect(dbUser).toHaveProperty('birthday', new Date(data.birthday));
    });

    test('should return 400 if date is tomorrow', async () => {
      userOne.flow.lastFlow = 'birthday';
      await insertUsers([userOne]);

      data = {
        birthday: moment().add(1, 'days').toJSON(),
      };

      await request(server)
        .post(`${apiPrefix}/user/birthday`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if date is diffent from iso', async () => {
      userOne.flow.lastFlow = 'birthday';
      await insertUsers([userOne]);

      data = {
        birthday: moment().format('DD/MM/YYYY'),
      };

      await request(server)
        .post(`${apiPrefix}/user/birthday`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('POST /user/phone-number', () => {
    let data;
    test('should return 200', async () => {
      userOne.flow.lastFlow = 'phone-number';
      await insertUsers([userOne]);

      data = {
        phoneNumber: 48096454013,
      };

      const res = await request(server)
        .post(`${apiPrefix}/user/phone-number`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('phonesNumber');
      expect(res.body.phonesNumber).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            phoneNumber: data.phoneNumber,
          }),
        ]),
      );

      const dbUser = await User.findById(res.body.id).lean();
      expect(dbUser).toBeDefined();
      expect(dbUser).toHaveProperty('phonesNumber');
      // @ts-ignore
      expect(dbUser.phonesNumber).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            phoneNumber: data.phoneNumber,
          }),
        ]),
      );
    });
    test('should return 200 and create lastUpdate field if same phoneNumber', async () => {
      userOne.flow.lastFlow = 'phone-number';
      await insertUsers([userOne]);

      data = {
        phoneNumber: 48096454013,
      };

      await request(server)
        .post(`${apiPrefix}/user/phone-number`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      const res = await request(server)
        .post(`${apiPrefix}/user/phone-number`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('phonesNumber');
      expect(res.body.phonesNumber).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.anything(),
          }),
        ]),
      );
    });
    test('should return 200 and add new phoneNumber if is changed', async () => {
      userOne.flow.lastFlow = 'phone-number';
      await insertUsers([userOne]);

      data = {
        phoneNumber: 48096454013,
      };

      await request(server)
        .post(`${apiPrefix}/user/phone-number`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      const res = await request(server)
        .post(`${apiPrefix}/user/phone-number`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ phoneNumber: data.phoneNumber + 1 })
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('phonesNumber');
      expect(res.body.phonesNumber).toHaveLength(2);
    });
  });
  describe('POST /user/address', () => {
    let data;
    test('should return 200 valid cep and correct fields', async () => {
      userOne.flow.lastFlow = 'address';
      await insertUsers([userOne]);

      data = {
        address: {
          cep: 52110090,
          street: 'Rua Mário Bhering',
          number: 142,
          complement: 'casa',
          city: 'Recife',
          state: 'PE',
        },
      };

      const res = await request(server)
        .post(`${apiPrefix}/user/address`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('address.cep', data.address.cep);
      expect(res.body).toHaveProperty('address.street', data.address.street);
      expect(res.body).toHaveProperty('address.complement', data.address.complement);
      expect(res.body).toHaveProperty('address.city', data.address.city);
      expect(res.body).toHaveProperty('address.state', data.address.state);

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toHaveProperty('address.cep', data.address.cep);
      expect(dbUser).toHaveProperty('address.street', data.address.street);
      expect(dbUser).toHaveProperty('address.complement', data.address.complement);
      expect(dbUser).toHaveProperty('address.city', data.address.city);
      expect(dbUser).toHaveProperty('address.state', data.address.state);
    });
    test('should return 400 invalid cep', async () => {
      userOne.flow.lastFlow = 'address';
      await insertUsers([userOne]);

      data = {
        address: {
          cep: 52110091,
          street: 'Rua Mário Bhering',
          number: 142,
          complement: 'casa',
          city: 'Recife',
          state: 'PE',
        },
      };

      await request(server)
        .post(`${apiPrefix}/user/address`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 invalid state', async () => {
      userOne.flow.lastFlow = 'address';
      await insertUsers([userOne]);

      data = {
        address: {
          cep: 52110090,
          street: 'Rua Mário Bhering',
          number: 142,
          complement: 'casa',
          city: 'Recife',
          state: 'SP',
        },
      };

      await request(server)
        .post(`${apiPrefix}/user/address`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 invalid city', async () => {
      userOne.flow.lastFlow = 'address';
      await insertUsers([userOne]);

      data = {
        address: {
          cep: 52110090,
          street: 'Rua Mário Bhering',
          number: 142,
          complement: 'casa',
          city: 'São paulo',
          state: 'PE',
        },
      };

      await request(server)
        .post(`${apiPrefix}/user/address`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return 400 invalid street', async () => {
      userOne.flow.lastFlow = 'address';
      await insertUsers([userOne]);

      data = {
        address: {
          cep: 52110090,
          street: 'Rua Mário Souza',
          number: 142,
          complement: 'casa',
          city: 'Recife',
          state: 'PE',
        },
      };

      await request(server)
        .post(`${apiPrefix}/user/address`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('POST /user/loan-request', () => {
    let data;
    test('should return 200', async () => {
      userOne.flow.lastFlow = 'loan-request';
      await insertUsers([userOne]);

      data = {
        loan: {
          request: 10000,
        },
      };

      const res = await request(server)
        .post(`${apiPrefix}/user/loan-request`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(data)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toHaveProperty('loan.request', data.loan.request);

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toHaveProperty('loan.request', data.loan.request);
    });
  });
});

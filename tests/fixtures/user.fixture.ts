import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import faker from 'faker';
import User from '@provi/models/User';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const flow = {
  flowList: ['cpf', 'full-name', 'birthday', 'phone-number', 'address', 'loan-request'],
  lastFlow: 'birthday',
};

const userOne = {
  _id: mongoose.Types.ObjectId(),
  fullName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  flow,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

export { userOne, insertUsers };

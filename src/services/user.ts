import httpStatus from 'http-status';
import User from '@provi/models/User';
import ApiError from '@provi/common/ApiError';
import findCep from '@provi/common/findCep';

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUserByEmail = async (userEmail, updateBody) => {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, user.userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if (updateBody.address && updateBody.address.cep) {
    const cepResult = await findCep(updateBody.address.cep);
    if (cepResult.erro) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'cep is invalid.');
    } else {
      if (cepResult.uf.toLowerCase() !== updateBody.address.state.toLowerCase())
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `state is invalid. provided: ${updateBody.address.state} correct: ${cepResult.uf}`,
        );

      if (cepResult.localidade.toLowerCase() !== updateBody.address.city.toLowerCase())
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `city is invalid. provided: ${updateBody.address.city} correct: ${cepResult.localidade}`,
        );

      if (cepResult.logradouro.toLowerCase() !== updateBody.address.street.toLowerCase())
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `street is invalid. provided: ${updateBody.address.street} correct: ${cepResult.logradouro}`,
        );
    }
  }

  if (updateBody.phoneNumber) {
    const phoneNumber = user.get('phonesNumber').find((item) => item.phoneNumber === updateBody.phoneNumber);
    if (!phoneNumber) {
      user.phonesNumber.push({ phoneNumber: updateBody.phoneNumber });
      user.phonesNumber[user.phonesNumber.length - 1].save({ suppressWarning: true });
    }
  }
  Object.assign(user, updateBody);
  await user.updateOne(user);
  return user;
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
};

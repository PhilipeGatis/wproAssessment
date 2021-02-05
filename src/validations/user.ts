import Joi from '@hapi/joi';
import { cpf, cep } from '@provi/validations/custom';

const updateCpf = {
  body: Joi.object().keys({
    cpf: Joi.string().required().custom(cpf),
  }),
};

const updateFullName = {
  body: Joi.object().keys({
    fullName: Joi.string(),
  }),
};

const updateBirthday = {
  body: Joi.object().keys({
    birthday: Joi.date().iso().less('now').required(),
  }),
};

const updatePhonenumber = {
  body: Joi.object().keys({
    phoneNumber: Joi.number().required(),
  }),
};

const updateAddress = {
  body: Joi.object().keys({
    address: Joi.object()
      .keys({
        cep: Joi.number().required().custom(cep),
        street: Joi.string().required(),
        number: Joi.number().required(),
        complement: Joi.string(),
        city: Joi.string().required(),
        state: Joi.string().uppercase().length(2).required(),
      })
      .required(),
  }),
};

const updateLoanRequest = {
  body: Joi.object().keys({
    loan: Joi.object().keys({
      request: Joi.number().integer().required(),
    }),
  }),
};

export { updateCpf, updateFullName, updateBirthday, updatePhonenumber, updateAddress, updateLoanRequest };

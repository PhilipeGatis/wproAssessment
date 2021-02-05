import document from 'cpf_cnpj';

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const cpf = (value, helpers) => {
  if (!document.CPF.isValid(value)) {
    return helpers.message('cpf is invalid');
  }
  return value;
};

const cep = (value, helpers) => {
  if (value.toString().length !== 8) {
    return helpers.message('cep is invalid');
  }
  return value;
};

export { cpf, password, cep };

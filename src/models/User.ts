import { Schema, model } from 'mongoose';
import validator from 'validator';
import toJSON from '@provi/models/plugins/toJson';
import bcrypt from 'bcryptjs';
import document from 'cpf_cnpj';

const phoneNumberSchema = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: false,
    },
  },
  { timestamps: { updatedAt: 'updated_at' } },
);

const loanSchema = new Schema(
  {
    request: {
      type: Number,
      required: false,
    },
  },
  { timestamps: { updatedAt: 'updated_at' } },
);

const flowSchema = new Schema(
  {
    flowList: {
      type: [String],
      default: ['cpf', 'full-name', 'birthday', 'phone-number', 'address', 'loan-request'],
      required: true,
    },
    lastFlow: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { updatedAt: 'updated_at' } },
);

const adressSchema = new Schema(
  {
    cep: {
      type: Number,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: false,
      trim: true,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
    },
    complement: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { updatedAt: 'updated_at' } },
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate: (value) => {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: Date,
      required: false,
      trim: true,
    },
    cpf: {
      type: String,
      required: false,
      trim: true,
      validate: (value) => {
        if (!document.CPF.isValid(value)) {
          throw new Error('Invalid cpf number');
        }
      },
    },
    phonesNumber: {
      type: [phoneNumberSchema],
    },
    address: {
      type: adressSchema,
    },
    loan: {
      type: loanSchema,
    },
    flow: {
      type: flowSchema,
      default: () => ({}),
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true } },
);

userSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema
  .virtual('fullName')
  .get((value, virtual, doc) => {
    return doc.firstName + ' ' + doc.lastName;
  })
  .set((value, virtual, doc) => {
    const parts = value.split(' ');
    doc.firstName = parts[0];
    doc.lastName = parts.slice(1).join(' ');
  });

const User = model('User', userSchema);

export default User;

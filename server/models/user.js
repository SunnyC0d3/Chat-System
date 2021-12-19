import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const USER_TYPES = {
  CONSUMER: 'consumer',
  SUPPORT: 'support',
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

// eslint-disable-next-line func-names
userSchema.statics.getUsers = async function () {
  const users = await this.find();
  return users;
};

// eslint-disable-next-line func-names
userSchema.statics.getUserById = async function (id) {
  const user = await this.findOne({ _id: id });
  // eslint-disable-next-line no-throw-literal
  if (!user) throw 'No user with this id found';
  return user;
};

// eslint-disable-next-line func-names
userSchema.statics.deleteByUserById = async function (id) {
  const result = await this.remove({ _id: id });
  // eslint-disable-next-line no-throw-literal
  if (result.deletedCount === 0) throw 'No user found matching the id.';
  return result;
};

export default mongoose.model('User', userSchema);

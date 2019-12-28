const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    require: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
});

UserSchema.pre('save', async function (next) {
  try  {
    if (this.method !== 'local') {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.local.password = await bcrypt.hash(this.local.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('User', UserSchema);

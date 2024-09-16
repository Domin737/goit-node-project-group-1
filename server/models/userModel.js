// server/models/userModel.js
const mongoose = require('mongoose');
const gravatar = require('gravatar');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Hasło jest wymagane tylko jeśli nie ma googleId
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Pozwala na null/undefined wartości
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250', d: 'retro' }, true);
      },
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

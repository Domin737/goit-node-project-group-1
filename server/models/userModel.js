// server/models/userModel.js
const mongoose = require('mongoose');
const gravatar = require('gravatar'); // Dodanie Gravatara

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
      required: true,
    },
    avatarURL: {
      type: String,
      default: function () {
        // Automatyczne generowanie URL avatara z Gravatar na podstawie emaila
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

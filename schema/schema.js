const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
});

const otherLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  socialLinks: [socialLinkSchema],
  otherLinks: [otherLinkSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: '' }, // Empty string as default value for bio
  profilePicture: { type: String, default: '' }, // Empty string as default value for profile picture
  socialLinks: {
    type: [socialLinkSchema],
    validate: {
      validator: function (socialLinks) {
        return socialLinks.every((link) => link.platform && link.url);
      },
      message: 'All social links must have a valid platform and URL.'
    }
  },
  links: [{
    title: { type: String, required: true },
    url: { type: String, required: true }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

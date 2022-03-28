const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activeUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: false,
    },
  ],
});

module.exports = model('Channel', channelSchema);

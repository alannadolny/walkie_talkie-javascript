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
    unique: false,
  },
  activeUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: false,
    },
  ],
  currentIds: [
    {
      type: String,
      unique: false,
    },
  ],
});

module.exports = model('Channel', channelSchema);

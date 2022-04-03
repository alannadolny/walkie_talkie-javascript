const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = model('Message', messageSchema);

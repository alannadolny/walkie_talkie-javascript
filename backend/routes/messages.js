const mongoose = require('mongoose');
const express = require('express');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const Channel = require('../models/Channel');
const Message = require('../models/Message');

require('dotenv').config();

function verifyToken(req, res, next) {
  const header = req.headers.cookie
    ? req.headers.cookie.split('auth=')[1]
    : undefined;
  const token = header && header.split(';')[0];
  if (token === undefined) return res.status(401).send('invalid token');
  jwt.verify(token, process.env.TOKEN || 'token', (err, login) => {
    if (err) return res.status(403);
    req.body.login = login.login;
    next();
  });
}

router.post('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    const channel = await Channel.findOne({ name: req.body.name });
    const message = await Message({
      channel: channel._id,
      sender: user._id,
      text: req.body.text,
    }).save();
    return res.status(200).send({
      _id: message._id,
      name: req.body.name,
      channel: message.channel,
      sender: [{ login: req.body.login }],
      text: message.text,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/channel/:name', verifyToken, async (req, res) => {
  try {
    const channel = await Channel.findOne({ name: req.params.name });
    const messages = await Message.aggregate([
      {
        $match: {
          channel: channel._id,
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: 'sender',
          foreignField: '_id',
          as: 'sender',
        },
      },
      {
        $project: {
          text: 1,
          channel: 1,
          sender: {
            login: 1,
          },
        },
      },
    ]);
    return res.status(200).send(messages);
  } catch (err) {
    return res.status(200).send(err);
  }
});

module.exports = router;

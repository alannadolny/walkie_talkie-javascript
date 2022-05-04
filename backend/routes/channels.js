const mongoose = require('mongoose');
const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const Channel = require('../models/Channel');
const jwt = require('jsonwebtoken');

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

router.get('/exists/:channelName', async (req, res) => {
  try {
    const channel = await Channel.findOne({ name: req.params.channelName });
    if (channel) return res.status(200).send({ exists: true });
    return res.status(200).send({ exists: false });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    const channel = await Channel({
      name: req.body.name,
      owner: user._id,
      activeUsers: [],
      currentIds: [],
    }).save();
    return res
      .status(200)
      .send({ ...channel._doc, owner: [{ login: req.body.login }] });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const channels = await Channel.aggregate([
      {
        $lookup: {
          from: User.collection.name,
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: 'activeUsers',
          foreignField: '_id',
          as: 'activeUsers',
        },
      },
      {
        $project: {
          name: 1,
          activeUsers: 1,
          currentIds: 1,
          owner: {
            login: 1,
          },
          activeUsers: {
            login: 1,
          },
        },
      },
    ]);
    return res.status(200).send(channels);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    const channel = await Channel.findOne({
      name: req.body.name,
      owner: user._id,
    });
    await channel.remove();
    return res.status(200).send(channel);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch('/connect', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    await Channel.findOne({ name: req.body.name }).updateOne({
      $push: {
        activeUsers: [user._id],
      },
    });
    return res.status(200).send({ login: req.body.login, name: req.body.name });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch('/disconnect', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    const editedChannel = await Channel.findOne({
      name: req.body.name,
    }).updateOne({
      $pull: {
        activeUsers: user._id,
      },
    });
    return res.status(200).send({ name: req.body.name, login: req.body.login });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch('/connect/voice', verifyToken, async (req, res) => {
  try {
    const channel = await Channel.findOne({
      name: req.body.name,
    }).updateOne({
      $push: {
        currentIds: [req.body.id],
      },
    });
    return res.status(200).send({ name: req.body.name, id: req.body.id });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

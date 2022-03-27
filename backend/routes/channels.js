const mongoose = require('mongoose');
const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const Channel = require('../models/Channel');

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    const channel = await Channel({
      name: req.body.name,
      owner: user._id,
      activeUsers: [],
    }).save();
    return res.status(200).send(channel);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const channels = await Channel.find({});
    return res.status(200).send(channels);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/', async (req, res) => {
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

router.patch('/connect', async (req, res) => {
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

router.patch('/disconnect', async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    const editedChannel = await Channel.findOne({
      name: req.body.name,
    }).updateOne({
      $pull: {
        activeUsers: user._id,
      },
    });
    return res.status(200).send(editedChannel);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

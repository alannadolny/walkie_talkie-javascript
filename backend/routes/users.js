const mongoose = require('mongoose');
const express = require('express');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');

require('dotenv').config();

router.post('/register', async (req, res) => {
  try {
    const user = await User({
      login: req.body.login,
      password: req.body.password,
    }).save();
    const jwtToken = jwt.sign(
      { login: user.login },
      process.env.TOKEN || 'token'
    );
    return res
      .status(200)
      .cookie('auth', jwtToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(2, 'hours').toDate(),
      })
      .send({ status: 'registered successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body.login, req.body.password);
    const user = await User.findOne({
      login: req.body.login,
      password: req.body.password,
    });
    if (!user) return res.status(404).send({ status: 'not found' });
    else {
      const jwtToken = jwt.sign(
        { login: user.login },
        process.env.TOKEN || 'token'
      );
      return res
        .status(200)
        .cookie('auth', jwtToken, {
          secure: true,
          httpOnly: true,
          expires: dayjs().add(2, 'hours').toDate(),
        })
        .send({ status: 'logged successfully', login: req.body.login });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

const mongoose = require('mongoose');
const express = require('express');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');

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

router.get('/exists/:userLogin', async (req, res) => {
  try {
    const response = await User.findOne({ login: req.params.userLogin });
    if (response) return res.status(200).send({ exists: true });
    return res.status(200).send({ exists: false });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await User({
      login: req.body.login,
      password: req.body.password,
      image: null,
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
      .send({ status: 'registered successfully', login: req.body.login });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
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

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          login: { $eq: req.body.login },
        },
      },
      {
        $project: {
          _id: 0,
          image: 1,
          password: 0,
          __v: 0,
        },
      },
    ]);
    return res.status(200).send(user[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/logout', verifyToken, async (req, res) => {
  try {
    return res
      .clearCookie('auth', {
        secure: true,
        httpOnly: true,
      })
      .send({ status: 'logout' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;

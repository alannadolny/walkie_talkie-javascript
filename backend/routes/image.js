const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router({ mergeParams: true });
const multer = require('multer');
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/image/:login', verifyToken, async (req, res) => {
  try {
    const file = await User.findOne({
      login: req.body.login,
    });
    return res.status(200).sendFile(`/images/${file.image}`, { root: `./` });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post(
  '/image',
  upload.single('file'),
  verifyToken,
  async function (req, res) {
    try {
      await User.findOne({
        login: req.body.login,
      }).updateOne({ image: req.file.filename });
      return res.send({ filename: req.file.filename });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

module.exports = router;

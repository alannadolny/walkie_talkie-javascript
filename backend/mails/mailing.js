const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASSWORD,
  },
});

router.post('/', async (req, res) => {
  try {
    await transporter.sendMail({
      from: `Walkie Talkie`,
      to: process.env.MAIL_LOGIN,
      subject: `Walkie Talkie - support (${req.body.sender})`,
      text: `${req.body.message}`,
    });
    return res.status(200).send('OK');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASSWORD,
  },
});

router.post('/', async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"Walkie Talkie" <${req.body.sender}>`,
      to: process.env.MAIL_OWNER,
      subject: 'Walkie Talkie - support',
      text: `${req.body.message}`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

"use strict";

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/sendemail", async (req, res) => {
  const receiver = req.body.receiver;
  const title = req.body.title;
  const subject = req.body.subject;
  const details = req.body.details;

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: receiver,
      subject: subject,
      text: title,
      html: `
      <div>
        <p>${details}</p>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log("Email sent: " + info.response);
        res.json(info.response);
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
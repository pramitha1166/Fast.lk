"use strict";

const nodemailer = require("nodemailer");
const emailValidate = require("./../util/emailValidation");

/**
 * Current implementation for email service
 * uses nodemailer @visit {https//www.npmjs.com/package/nodemailer}
 *
 * @params {An instance of email model}
 * @return {promise} {resolve upon successfull email sent or reject if there is any error}
 */
const sendEmail = (email) => {
  return new Promise((resolve, reject) => {
    //validate inputs
    const validate = emailValidate(email);
    if (validate.error !== undefined) {
      reject(validate.error.details[0].message); //reject if there is any validation error
    }
    
    //extract data from the instance of model email
    const receiver = email.receiver;
    const title = email.title;
    const subject = email.subject;
    const details = email.details;

    try {
      //email service configuration
      var transporter = nodemailer.createTransport({
        service: "gmail", //service provider
        auth: {
          //email account credentials
          user: process.env.EMAIL, //email
          pass: process.env.EMAIL_PASSWORD, //password
        },
      });

      //email info
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

      //sending the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error); //reject if there is any error
        } else {
          resolve(info.response); //resolve after successfull email sent
        }
      });
    } catch (err) {
      reject(err); //reject if there is any error
    }
  });
};

module.exports.sendEmail = sendEmail;

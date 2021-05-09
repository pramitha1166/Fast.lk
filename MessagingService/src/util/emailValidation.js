"use strict";

const Joi = require("joi");

/**
 * Current implementation validate inputs
 * uses joi @visit {https://www.npmjs.com/package/joi}
 *
 * @params {An instance of email model}
 * @return {boolean} {valid or invalid}
 */
const emailValidate = (inputs) => {
  const schema = Joi.object({
    receiver: Joi.string()
      .min(4)
      .max(100)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "lk"] } })
      .required(),
    title: Joi.string().min(4).max(255).required(),
    subject: Joi.string().min(4).max(255).required(),
    details: Joi.string().min(4).max(1024).required(),
  });

  return schema.validate({
    receiver: inputs.receiver,
    title: inputs.title,
    subject: inputs.subject,
    details: inputs.details,
  });
};

module.exports = emailValidate;

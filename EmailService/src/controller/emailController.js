"use strict";

const express = require("express");
const router = express.Router();
const Email = require("../model/email");
const { sendEmail } = require("./../service/emailService");
/**
 * This function is only for accepting /api/email/sendemail requests
 * The request body must contain all the attributes of model email 
 * see model email @path {src/model/email.js}
 * This function can use any email sending service implemeneted on emailService layer.
 * see emailService @path {src/service/emailService.js}
 * 
 * @method { HTTP POST }
 * @url {/api/email/sendemail}
 * @urlparams {none} 
 * @return {json} {result given by the email service implementation || or any errors}
 */
router.post("/sendemail", async (req, res) => {
  const email = new Email(req.body);
  try{
    const result = await sendEmail(email);
    res.json({result});
  }catch(err){
    res.json(err);
  }
});

module.exports = router;
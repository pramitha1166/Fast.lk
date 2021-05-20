const mongoose = require("mongoose");
const seller = require("../model/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const emailValue = req.body.email;
  const password = req.body.password;

  try {
    const getUser = await seller.find({ email: emailValue });
    if (getUser.length === 0) {
      res.send("Invalid email");
    } else {
      const passwordCheck = bcrypt.compareSync(password, getUser[0].password);
      if (passwordCheck) {
        const token = jwt.sign(
          { _id: getUser[0]._id, email: getUser[0].email, role: 0 },
          process.env.TOKENSCRET,
          { expiresIn: "24h" }
        );
        console.log(token)
        res.send(token);
      } else {
        res.send("Invalid password");
      }
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const validatetoken = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    res.status(403).send("Token not provided");
  } else {
    jwt.verify(token, process.env.TOKENSCRET, function (err, decoded) {
      if (err) {
        res.status(403).json({ status: 403, err: err });
      } else {
        res.user = decoded;
        res.status(200).json({ status: 200, data: decoded });
      }
    });
  }
};

module.exports.login = login;
module.exports.validatetoken = validatetoken;

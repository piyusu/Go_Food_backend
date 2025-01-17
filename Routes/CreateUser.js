const express = require("express");
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret= "MyNameIsPiyushUpadhyay";
router.post(
  "/CreateUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 6 }),
    body("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res
          .status(404)
          .json({ errors: "try logging with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
      if (!pwdCompare) {
        return res.status(404).json({ errors: "try logging with correct credentials" });
      }

    const data={
        user:{
            id:userData._id,
        }
    }

    const authToken= jwt.sign(data,jwtsecret)
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Ipekisgoodg$irl";
var fetchuser = require("../middleware/fetchuser");

router.get("/", (req, res) => {
  console.log(req.body);
  res.send("THIS IS AUTH PAGE");
});

// ROUTE 1 - Create a User using: POST '/api/auth/signup'. Doesnt required auth
router.post(
  "/signup",
  [
    body("firstName","First Name cannot be blank").exists(),
    body("lastName","Last Name cannot be blank").exists(),
    body(
      "userName",
      "The username should be more than five characters"
    ).isLength({ min: 5 }),
    body("email", "You should enter a  valid email").isEmail(),
    body(
      "password",
      "Password must consist of one lowercase,uppercase,number,symbol and minimun 8 characters"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),

    body("phoneNumber", "Please enter a 10 digit phone number").matches(
      /^\d{10}$/
    ),
    body("gender", "Gender should be 'Male' or 'Female'").isIn(['Male', 'Female']), 

  ],
  async (req, res) => {
    let success = false;
    //If there are erros,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //Check Unique Email id
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User already exists.Try Again" });
      }
      //Hash Password fro Security
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new User
      user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: secPass,
        email: req.body.email,
        phoneNumber:req.body.phoneNumber,
        gender:req.body.gender
      });

      //Add an ID
      const data = {
        user: {
          id: user.id,
        },
      };

      //Create Unique Authorization Token for each User
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);


//ROUTE 2 - Authentication of user using: POST- api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;

        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
    }
  }
);


//ROUTE 3 - Logged in User's Information: POST- api/auth/getuser: Login Required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }
});

module.exports = router;


const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");


// API - To add user into a database
authRouter.post("/signup", async (req, res) => {
    try {
    // Validation of data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password , 10);
    console.log(passwordHash)

    // Creating a new instance of the User Model
       console.log(req.body);
       const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
       });

        const savedUser = await user.save();


        res.json({message: "User added successfully", data: savedUser});
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("ERROR : " + error.message);
    }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    // console.log(user);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Credentials");


    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h"
    });
    

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // ✅ required for HTTPS + cross-origin
    sameSite: "None",    // ✅ required for cross-site cookies
    expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json(user)
    // if (isPasswordValid) {
    //   // Create a JWT Token
    //   const token = await user.getJWT();
    //   // console.log(token);

    //   // Add the token to cookie  and send the response back to the user
    //   // Set cookie here
    //   res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production", // HTTPS only in production
    //     sameSite: "strict", // CSRF protection
    //     expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    //   });

    //   res.send(user);
    // } else {
    //   throw new Error("Invalid Credentials pass");
    // }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully");
});

module.exports = authRouter;
import express from "express";
import { Admin, generateAuthToken } from "../models/AdminSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const isAdmin = await Admin.findOne({ email: req.body.email });

    if (isAdmin) {
      return res
        .status(409)
        .json({ message: "E-mail Already exists as Admin" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let Admin = await new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }).save();

    const token = generateAuthToken(Admin._id);
    res.status(201).json({ message: "Successfully signed up", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const signUpAdmin = router;

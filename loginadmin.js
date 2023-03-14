import express from "express";
import bcrypt from "bcrypt";
import { Admin, generateAuthToken } from "../models/adminSchema.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const isAdmin = await Admin.findOne({ email: req.body.email });
    if (!isAdmin) {
      return res.status(400).json({ message: "Invalid Credentials -Email" });
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      isAdmin.password
    );
    if (!validatePassword) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials  -password" });
    }

    const token = generateAuthToken(Admin._id);

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const loginAdmin = router;

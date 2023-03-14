import express from "express";
import { Manager, generateAuthToken } from "../models/ManagerSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const isManager = await Manager.findOne({ email: req.body.email });

    if (isManager) {
      return res
        .status(409)
        .json({ message: "E-mail Already exists as Manager" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let Manager = await new Manager({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }).save();

    const token = generateAuthToken(Manager._id);
    res.status(201).json({ message: "Successfully signed up", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const signUpManager = router;

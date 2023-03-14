import express from "express";
import { Employee, generateAuthToken } from "../models/EmployeeSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const isEmployee = await Employee.findOne({ email: req.body.email });

    if (isEmployee) {
      return res
        .status(409)
        .json({ message: "E-mail Already exists as Employee" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let Employee = await new Employee({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }).save();

    const token = generateAuthToken(Employee._id);
    res.status(201).json({ message: "Successfully signed up", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const signUpEmployee = router;

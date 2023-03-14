import express from "express"
import bcrypt from "bcrypt"
import { Employee, generateAuthToken } from "../models/ EmployeeSchema.js";
const router = express.Router(); 

router.post("/", async(req, res)=>{
    try {
        
        const is Employee = await  Employee.findOne({email : req.body.email})
        if (!is Employee){
            return res.status(400).json({message : "Invalid Credentials -Email"})
        }

        const validatePassword = await bcrypt.compare(
            req.body.password,
            is Employee.password
        )
        if (!validatePassword) {
            return res.status(400).json({message:"Invalid Credentials  -password"})
        }

    const token =  generateAuthToken( Employee._id); 

      res.status(200).json({message: "Logged in successfully", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message :"Internal server error"})
    }
})

export const login Employee = router
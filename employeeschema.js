import { stringifyRequest } from "loader-utils";
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    user name :{
      type:string,
      required:true,
      unique:true,
      trim:true,
    },

    first name:{
      type:string,
      required:true,
      maxlength:10,
      trim:true,
    },

    last name:{
      type:string,
      required:true,
      maxlength:10,
      trim:true,
    },

    password:{
      type:string,
      required:true,
    },
  }
)

const employee = mongoose.model("employee",employeeSchema);
export{Employee}
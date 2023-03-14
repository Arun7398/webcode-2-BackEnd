import express from "express";
import { DataBaseConnection } from "./db.js";
import dotenv from "dotenv";
import { Adminschema } from "./models/Adminschema.js";
import { signUpadmin } from "./routes/signupAdmin.js";
import { loginAdmin } from "./routes/loginAdmin.js";
import { Employeeschema } from "./models/Employeeschema.js";
import { signupemployee } from "./routes/signupEmployee.js";
import { loginemployee } from "./routes/loginEmployee.js";

import { Managerschema } from "./models/Managerchema.js";
import { signupManager } from "./routes/Manager.js";
import { loginManager } from "./routes/loginManager.js";
import { ppid } from "process";

// import { signUpAdmin } from "./routes/adminRoutes.js";

const app = express();
dotenv.config();

DataBaseConnection();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi Welcome!!!");
});

app.use("/admin", AdminRoutes);
app.use("/adminSignup", signUpAdmin);
app.use("/adminLogin", loginAdmin);

app.use("/employee", EmployeeRoutes);
app.use("/employeeSignup", signUpEmployee);
app.use("/employeeLogin", loginEmployee);

app.use("/manager", ManagerRoutes);
app.use("/managerSignup", signUpManager);
app.use("/managerLogin", loginManager);
// app.use("/adminsignup",signUpAdmin)
app.use("/loginAdmin", loginAdmin);

//{
//    "name":"Arun",
//    "email":"Arun01023@gmail.com",
//    "password":"Admin123"
//}

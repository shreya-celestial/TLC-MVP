import express from "express";
import user from "./Routes/user"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use('/user', user)

app.listen(8080,()=>{
  console.log('Listening on http://localhost:8080/')
})
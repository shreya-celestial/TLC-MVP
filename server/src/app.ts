import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./Routes/user"
import volunteers from "./Routes/volunteers"
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use('/user', user)
app.use('/volunteers', volunteers)

app.listen(8080,()=>{
  console.log('Listening on http://localhost:8080/')
})
import express from "express";
import user from "./Routes/user"
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(express.json());

app.use('/user', user)

app.listen(8080,()=>{
  console.log('Listening on http://localhost:8080/')
})
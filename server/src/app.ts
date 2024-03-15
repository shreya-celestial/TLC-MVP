import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import user from "./Routes/user"
import volunteers from "./Routes/volunteers"
import workshops from "./Routes/workshops"
import enrollments from "./Routes/enrollment"
import meetings from "./Routes/meetings"
import dashboard from "./Routes/dashboard"
import auth from "./middlewares/auth";
dotenv.config()

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors())

app.use('/user', user)
app.use('/volunteers', volunteers)
app.use('/workshops', workshops)
app.use('/enrollments', auth, enrollments)
app.use('/meetings', auth, meetings)
app.use('/dashboard', auth, dashboard)

app.listen(8080,()=>{
  console.log('Listening on http://localhost:8080/')
})
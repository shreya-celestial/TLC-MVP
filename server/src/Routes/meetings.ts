import express from "express";
import newMeeting from "../controllers/meetings/newMeeting";

const router = express.Router()

router.post('/', newMeeting)

export default router
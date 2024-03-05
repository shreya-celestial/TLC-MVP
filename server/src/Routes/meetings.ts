import express from "express";
import newMeeting from "../controllers/meetings/newMeeting";
import allPageMeetings from "../controllers/meetings/allPageMeetings";
import getSingleMeeting from "../controllers/meetings/getSingleMeeting";

const router = express.Router()

router.post('/', newMeeting)
router.get('/', allPageMeetings)
router.get('/:id/details', getSingleMeeting)

export default router
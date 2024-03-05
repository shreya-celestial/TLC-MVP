import express from "express";
import newMeeting from "../controllers/meetings/newMeeting";
import allPageMeetings from "../controllers/meetings/allPageMeetings";
import getSingleMeeting from "../controllers/meetings/getSingleMeeting";
import editMeeting from "../controllers/meetings/editMeeting";
import deleteMeetings from "../controllers/meetings/deleteMeetings";

const router = express.Router()

router.post('/', newMeeting)
router.get('/', allPageMeetings)
router.get('/:id/details', getSingleMeeting)
router.put('/:id/edit', editMeeting)
router.delete('/', deleteMeetings)

export default router
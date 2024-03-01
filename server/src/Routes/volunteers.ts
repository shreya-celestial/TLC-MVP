import express from "express";
import getAllVolunteers from "../controllers/volunteers/getAllVolunteers";
import getFilteredVolunteers from "../controllers/volunteers/filteredVolunteers";
import updateRole from "../controllers/volunteers/updateRole";
import deleteVolunteer from "../controllers/volunteers/deleteVolunteer";
import searchAndFilterVolunteer from "../controllers/volunteers/searchAndFilterVolunteer";
import inviteVolunteer from "../controllers/volunteers/inviteVolunteer";
import adminVerified from "../controllers/volunteers/adminVerified";
import getSingleVolunteer from "../controllers/volunteers/getSingleVolunteer";

const router = express.Router();

router.get('/', getAllVolunteers)
router.get('/:email', getSingleVolunteer)
// router.get('/filters', getFilteredVolunteers)
router.put('/updateRole', updateRole)
router.delete('/', deleteVolunteer)
router.get('/searchAndFilter', searchAndFilterVolunteer)
router.post('/invite', inviteVolunteer)
router.put('/adminVerified', adminVerified)

export default router
import express from "express";
import getAllVolunteers from "../controllers/volunteers/getAllVolunteers";
import getFilteredVolunteers from "../controllers/volunteers/filteredVolunteers";
import updateRole from "../controllers/volunteers/updateRole";
import deleteVolunteer from "../controllers/volunteers/deleteVolunteer";
import searchAndFilterVolunteer from "../controllers/volunteers/searchAndFilterVolunteer";
import inviteVolunteer from "../controllers/volunteers/inviteVolunteer";
import adminVerified from "../controllers/volunteers/adminVerified";
import getSingleVolunteer from "../controllers/volunteers/getSingleVolunteer";
import verifyInvite from "../controllers/volunteers/verifyInvite";
import inviteSignup from '../controllers/volunteers/inviteSignup';

const router = express.Router();

router.get('/', getAllVolunteers)
router.get('/:email/details', getSingleVolunteer)
// router.get('/filters', getFilteredVolunteers)
router.put('/updateRole', updateRole)
router.delete('/', deleteVolunteer)
router.get('/searchAndFilter', searchAndFilterVolunteer)
router.post('/invite', inviteVolunteer)
router.put('/adminVerified', adminVerified)
router.get('/verifyInvite/:token', verifyInvite)
router.post('/inviteSignup', inviteSignup)

export default router
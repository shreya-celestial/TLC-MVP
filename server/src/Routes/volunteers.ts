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
import auth from "../middlewares/auth";
import adminAuth from "../middlewares/adminAuth";

const router = express.Router();

// router.get('/', getAllVolunteers)
// router.get('/filters', getFilteredVolunteers)
router.get('/:email/details', auth, getSingleVolunteer)
router.get('/searchAndFilter', auth, searchAndFilterVolunteer)
router.put('/updateRole', adminAuth, updateRole)
router.delete('/', adminAuth, deleteVolunteer)
router.put('/adminVerified', adminAuth, adminVerified)
router.post('/invite', adminAuth, inviteVolunteer)
router.get('/verifyInvite', verifyInvite)
router.post('/inviteSignup', inviteSignup)

export default router
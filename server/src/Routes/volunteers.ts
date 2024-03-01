import express from "express";
import getAllVolunteers from "../controllers/volunteers/getAllVolunteers";
import getFilteredVolunteers from "../controllers/volunteers/filteredVolunteers";
import updateRole from "../controllers/volunteers/updateRole";
import deleteVolunteer from "../controllers/volunteers/deleteVolunteer";
import searchAndFilterVolunteer from "../controllers/volunteers/searchAndFilterVolunteer";

const router = express.Router();

router.get('/', getAllVolunteers)
// router.get('/filters', getFilteredVolunteers)
router.put('/updateRole', updateRole)
router.delete('/', deleteVolunteer)
router.get('/searchAndFilter', searchAndFilterVolunteer)


export default router
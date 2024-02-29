import express from "express";
import getAllVolunteers from "../controllers/volunteers/getAllVolunteers";
import getFilteredVolunteers from "../controllers/volunteers/filteredVolunteers";

const router = express.Router();

router.get('/', getAllVolunteers)
router.get('/filters', getFilteredVolunteers)


export default router
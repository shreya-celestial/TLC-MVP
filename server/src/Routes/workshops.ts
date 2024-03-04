import express from "express";
import newWorkshop from "../controllers/workshops/newWorkshop";
import allPageWorkshops from "../controllers/workshops/allPageWorkshops";

const router = express.Router();

router.post('/', newWorkshop)
router.get('/', allPageWorkshops)

export default router
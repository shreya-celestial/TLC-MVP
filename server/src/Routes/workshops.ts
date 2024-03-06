import express from "express";
import newWorkshop from "../controllers/workshops/newWorkshop";
import allPageWorkshops from "../controllers/workshops/allPageWorkshops";
import singleWorkshop from "../controllers/workshops/singleWorkshop";
import updateWorkshop from "../controllers/workshops/updateWorkshop";
import deleteWorkshop from "../controllers/workshops/deleteWorkshop";

const router = express.Router();

router.post('/', newWorkshop)
router.get('/', allPageWorkshops)
router.get('/:id/details', singleWorkshop)
router.put('/:id/update', updateWorkshop)
router.delete('/', deleteWorkshop)

export default router
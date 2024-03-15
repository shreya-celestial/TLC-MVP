import express from "express";
import newWorkshop from "../controllers/workshops/newWorkshop";
import allPageWorkshops from "../controllers/workshops/allPageWorkshops";
import singleWorkshop from "../controllers/workshops/singleWorkshop";
import updateWorkshop from "../controllers/workshops/updateWorkshop";
import deleteWorkshop from "../controllers/workshops/deleteWorkshop";
import auth from "../middlewares/auth";
import adminAuth from "../middlewares/adminAuth";

const router = express.Router();

router.post('/', adminAuth, newWorkshop)
router.get('/', auth, allPageWorkshops)
router.get('/:id/details', auth, singleWorkshop)
router.put('/:id/update', adminAuth, updateWorkshop)
router.delete('/', adminAuth, deleteWorkshop)

export default router
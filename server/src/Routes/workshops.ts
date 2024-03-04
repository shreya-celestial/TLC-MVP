import express from "express";
import newWorkshop from "../controllers/workshops/newWorkshop";

const router = express.Router();

router.post('/', newWorkshop)

export default router
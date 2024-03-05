import express from "express";
import getAllData from "../controllers/dashboard/getAllData";

const router = express.Router();

router.get('/', getAllData)

export default router
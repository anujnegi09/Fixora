import { Router } from "express";
import { reverseGeocode } from "../controller/LocationController.js";

const router = Router();

router.get("/reverse-geocode", reverseGeocode);

export default router;
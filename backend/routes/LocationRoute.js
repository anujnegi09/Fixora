import { Router } from "express";
import { reverseGeocode, searchLocation} from "../controllers/LocationController.js";

const router = Router();

router.get("/reverse-geocode", reverseGeocode);

router.get("/search", searchLocation);

export default router;
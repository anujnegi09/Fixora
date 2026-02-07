import{ createService ,
        getAllServices ,
        getServiceById ,
        updateService ,
        deleteService } from "../Controller/ServiceController.js";
import express from "express";
import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-service", verifyJWT, createService);
router.get("/services", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", verifyJWT, updateService);
router.delete("/:id", verifyJWT, deleteService);

export default router;
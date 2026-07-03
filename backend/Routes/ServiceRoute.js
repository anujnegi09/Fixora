import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controller/ServiceController.js";

import { verifyJWT } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Create service
router.post("/create", verifyJWT, createService);

// Get all services
router.get("/", getAllServices);

// Get single service
router.get("/:id", getServiceById);

// Update service
router.patch("/update/:id", verifyJWT, updateService);

// Delete service
router.delete("/delete/:id", verifyJWT, deleteService);

export default router;
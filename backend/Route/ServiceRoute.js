import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../Controller/ServiceController.js";

import { verifyJWT } from "../Middleware/authMiddleware.js";
import { verifySubscription } from "../Middleware/subscriptionMiddleware.js";

const router = express.Router();

// Create service
router.post("/create", verifyJWT, verifySubscription, createService);

// Get all services
router.get("/", getAllServices);

// Get single service
router.get("/:id", getServiceById);

// Update service
router.patch("/update/:id", verifyJWT, verifySubscription, updateService);

// Delete service
router.delete("/delete/:id", verifyJWT, deleteService);  //there is no need to verify subscription for deleting a service

export default router;
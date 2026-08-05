import express from "express";
import {
  getMyServices,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  toggleServiceVisibility
} from "../Controller/ServiceController.js";

import { verifyJWT } from "../Middleware/authMiddleware.js";
import { verifySubscription } from "../Middleware/subscriptionMiddleware.js";

const router = express.Router();

//get my services
router.get("/my-services",verifyJWT,getMyServices);

// Create service
router.post("/create", verifyJWT, createService);   //verifySubscription = temprary remove this

// Get all services
router.get("/", getAllServices);

// Get single service
router.get("/:id", getServiceById);

// Update service
router.patch("/update/:id", verifyJWT,verifySubscription, updateService);   

// Delete service
router.delete("/delete/:id", verifyJWT, deleteService);  //there is no need to verify subscription for deleting a service

router.patch("/:id/toggle-visibility",verifyJWT,toggleServiceVisibility);

export default router;




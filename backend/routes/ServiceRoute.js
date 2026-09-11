import express from "express";
import {
  getMyServices,
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  toggleServiceVisibility
} from "../controllers/ServiceController.js";

import { verifyJWT } from "../middlewares/authMiddleware.js";
import { verifySubscription } from "../middlewares/subscriptionMiddleware.js";

const router = express.Router();

//get my services
router.get("/my-services",verifyJWT,getMyServices);

// Create service
router.post("/create", verifyJWT, verifySubscription, createService);

// Get all services
router.get("/",verifyJWT, getAllServices );

// Get single service
router.get("/:id", getServiceById);

// Update service
router.patch("/update/:id", verifyJWT,verifySubscription, updateService);   

// Delete service
router.delete("/:id", verifyJWT, deleteService);  //there is no need to verify subscription for deleting a service

router.patch("/:id/toggle-visibility",verifyJWT,toggleServiceVisibility);

export default router;




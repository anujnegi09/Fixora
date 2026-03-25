// import{ createService ,
//         getAllServices ,
//         getServiceById ,
//         updateService ,
//         deleteService } from "../Controller/ServiceController.js";
// import express from "express";
// import { verifyJWT } from "../Middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/create-service", verifyJWT, createService);
// router.get("/services", getAllServices);
// router.get("/:id", getServiceById);
// router.put("/:id", verifyJWT, updateService);
// router.delete("/:id", verifyJWT, deleteService);

// export default router;

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
router.post("/", verifyJWT, createService);

// Get all services
router.get("/", getAllServices);

// Get single service
router.get("/:id", getServiceById);

// Update service
router.patch("/:id", verifyJWT, updateService);

// Delete service
router.delete("/:id", verifyJWT, deleteService);

export default router;
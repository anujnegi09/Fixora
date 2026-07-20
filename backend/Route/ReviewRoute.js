import express from "express";
import {addReview,
    getServiceReviews,
    updateReview,
    deleteReview} from "../Controller/ReviewController.js";
import {verifyJWT} from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/:bookingId",verifyJWT,addReview);

router.get("/service/:serviceId",verifyJWT,getServiceReviews);

router.patch("/:reviewId", verifyJWT, updateReview);

router.delete("/:reviewId", verifyJWT, deleteReview);

export default router;
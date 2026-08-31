import express from "express";
import {addReview,
    getServiceReviews,
    updateReview,
    deleteReview,
getMyReviews, getMyServiceReviews} from "../Controller/ReviewController.js";
import {verifyJWT} from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/:bookingId",verifyJWT,addReview);

router.get("/service/:serviceId",verifyJWT,getServiceReviews);

router.get("/my-reviews", verifyJWT, getMyReviews);

router.get("/my-service-reviews", verifyJWT, getMyServiceReviews);

router.patch("/:reviewId", verifyJWT, updateReview);

router.delete("/:reviewId", verifyJWT, deleteReview);

export default router;
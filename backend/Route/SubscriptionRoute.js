// import SubscriptionController from "../Controller/SubscriptionController.js";
import express from "express";
import { verifyJWT } from "../Middleware/authMiddleware.js";
import { createSubscription ,verifySubscriptionPayment ,
    getMySubscription,cancelSubscription, handleWebhook} from "../Controller/SubscriptionController.js";

const router = express.Router();

//create subscription

router.post("/create", verifyJWT, createSubscription);

//get my subscription
router.get("/my-subscription", verifyJWT, getMySubscription);

//verify subscription payment 
router.post("/verify-payment",verifyJWT, verifySubscriptionPayment);

//cancel subscription
router.post("/cancel" , verifyJWT, cancelSubscription);


// webhook route
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    handleWebhook
);


export default router;
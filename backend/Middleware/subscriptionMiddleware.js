import Subscription from "../Model/Subscription.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";

export const verifySubscription = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    // Find user's subscription
    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new apiError(403, "Please purchase a subscription first");
    }

    // Check status
    if (subscription.status !== "active") {
        throw new apiError(
            403,
            "Your subscription is not active. Please renew it."
        );
    }

    // Check expiry
    if (subscription.expiryDate < new Date()) {

        subscription.status = "expired";
        await subscription.save();

        throw new apiError(
            403,
            "Your subscription has expired. Please renew it."
        );
    }

    // Store subscription if needed in controllers
    req.subscription = subscription;

    next();
});
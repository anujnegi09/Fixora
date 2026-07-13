import Subscription from "../Model/Subscription.js";
import Razorpay from "../Config/razorpay.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import apiError from "../Utils/apiError.js";
import apiResponse from "../Utils/apiResponse.js";
import crypto from "crypto";
import Service from "../Model/Service.js";


export const createSubscription = asyncHandler(async (req,res)=>{
    const userId = req.user._id;

    const { plan } = req.body;
    if(!["monthly", "yearly"].includes(plan)){
        throw new apiError(400, "invalid subscription plan selected");
    }
    const existingSubscription = await Subscription.findOne({userId});
    if(existingSubscription && existingSubscription.status === "active"){
        throw new apiError(400, "you already have an active subscription");
    }

    //select razorpay plan 
    const planId = plan === "monthly" ? process.env.MONTHLY_PLAN_ID : process.env.YEARLY_PLAN_ID;

    if (!planId) {
    throw new apiError(500, "Subscription plan is not configured");
    }
//create razorpay subscription
    try{
        const razorpaySubscription = await Razorpay.subscriptions.create({
        plan_id : planId,
        customer_notify : 1,
        total_count : plan === "monthly" ? 12 : 1,    
    });
    }
    catch(error){
        throw new apiError(500, "failed to create subscription with razorpay");
    }
    
    let subscription;
    if(existingSubscription){
        existingSubscription.plan = plan;
        existingSubscription.status = "pending";
        existingSubscription.razorpaySubscriptionId = razorpaySubscription.id;
        existingSubscription.razorpayPaymentId = null;
        existingSubscription.razorpayOrderId = null;
        existingSubscription.startDate = null;
        existingSubscription.expiryDate = null;
        existingSubscription.amountPaid = 0;
        existingSubscription.autoRenew = true;

        subscription = await existingSubscription.save();
    }else{
        subscription = await Subscription.create({
            userId,
            plan,
            status: "pending",
            razorpaySubscriptionId: razorpaySubscription.id,
            autoRenew : true,
        })
    }

    const message = existingSubscription ? "Subscription updated successfully" : "Subscription created successfully"
    return res.status(201).json(new apiResponse(201,
        {
            subscription,
            razorpaySubscription,
        },
        message
        )
    );
})


export const verifySubscriptionPayment = asyncHandler(async (req, res) => {
    const {
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature,
    } = req.body;

    if (
        !razorpay_payment_id ||
        !razorpay_subscription_id ||
        !razorpay_signature
    ) {
        throw new apiError(400, "All payment details are required");
    }

    // Verify Signature
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        throw new apiError(400, "Invalid payment signature");
    }

    // Find Subscription
    const subscription = await Subscription.findOne({
        razorpaySubscriptionId: razorpay_subscription_id,
    });

    if (!subscription) {
        throw new apiError(404, "Subscription not found");
    }

    const startDate = new Date();
    const expiryDate = new Date(startDate);

    if (subscription.plan === "monthly") {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        subscription.amountPaid = 299;
    } else {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        subscription.amountPaid = 2999;
    }

    subscription.status = "active";
    subscription.razorpayPaymentId = razorpay_payment_id;
    subscription.startDate = startDate;
    subscription.expiryDate = expiryDate;

    await subscription.save();

    // Show all services
    await Service.updateMany(
        { userId: subscription.userId },
        {
            $set: {
                isVisible: true,
            },
        }
    );

    return res.status(200).json(
        new apiResponse(
            200,
            subscription,
            "Subscription verified successfully"
        )
    );
});

export const getMySubscription = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new apiError(404, "Subscription not found");
    }

    return res.status(200).json(
        new apiResponse(
            200,
            subscription,
            "Subscription fetched successfully"
        )
    );
});

export const cancelSubscription = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find subscription
    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
        throw new apiError(404, "Subscription not found");
    }

    if (subscription.status !== "active") {
        throw new apiError(400, "No active subscription found");
    }

    // Cancel subscription on Razorpay
    await Razorpay.subscriptions.cancel(
        subscription.razorpaySubscriptionId,
        {
            cancel_at_cycle_end: false, // Cancel immediately
        }
    );

    // Update MongoDB
    subscription.status = "cancelled";
    subscription.expiryDate = new Date();
    subscription.autoRenew = false;

    await subscription.save();

    // Hide all services of the user
    await Service.updateMany(
        { userId },
        {
            $set: {
                isVisible: false,
            },
        }
    );

    return res.status(200).json(
        new apiResponse(
            200,
            subscription,
            "Subscription cancelled successfully"
        )
    );
});



export const handleWebhook = asyncHandler(async (req, res) => {

    const webhookSignature = req.headers["x-razorpay-signature"];

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(req.body)
        .digest("hex");

    if (generatedSignature !== webhookSignature) {
        return res.status(400).json({
            success: false,
            message: "Invalid webhook signature",
        });
    }

    const event = JSON.parse(req.body.toString());

    switch (event.event) {

        case "subscription.activated": {

            const razorpaySubscriptionId =
                event.payload.subscription.entity.id;

            const subscription = await Subscription.findOne({
                razorpaySubscriptionId,
            });

            if (subscription) {

                subscription.status = "active";

                await subscription.save();

                await Service.updateMany(
                    { userId: subscription.userId },
                    {
                        $set: {
                            isVisible: true,
                        },
                    }
                );
            }

            break;
        }

        case "subscription.cancelled": {

            const razorpaySubscriptionId =
                event.payload.subscription.entity.id;

            const subscription = await Subscription.findOne({
                razorpaySubscriptionId,
            });

            if (subscription) {

                subscription.status = "cancelled";
                subscription.autoRenew = false;

                await subscription.save();

                await Service.updateMany(
                    { userId: subscription.userId },
                    {
                        $set: {
                            isVisible: false,
                        },
                    }
                );
            }

            break;
        }

        case "subscription.completed": {

            const razorpaySubscriptionId =
                event.payload.subscription.entity.id;

            const subscription = await Subscription.findOne({
                razorpaySubscriptionId,
            });

            if (subscription) {

                subscription.status = "expired";

                await subscription.save();

                await Service.updateMany(
                    { userId: subscription.userId },
                    {
                        $set: {
                            isVisible: false,
                        },
                    }
                );
            }

            break;
        }

        case "payment.failed": {

            console.log("Subscription payment failed.");

            break;
        }

        default:
            console.log(`Unhandled Event : ${event.event}`);
    }

    return res.status(200).json({
        success: true,
    });

});
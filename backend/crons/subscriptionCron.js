import cron from "node-cron";
import Subscription from "../models/SubscriptionModel.js";
import Service from "../models/ServiceModel.js";
import  logger  from "../configs/Logger.js";

const subscriptionCron = cron.schedule("0 0 * * *", async () => {

    logger.info("Checking expired subscriptions...");

    const expiredSubscriptions = await Subscription.find({
        status: "active",
        expiryDate: {
            $lt: new Date(),
        },
    });

    for (const subscription of expiredSubscriptions) {

        subscription.status = "expired";

        await subscription.updateOne(
            { _id: subscription._id },
                {
                    $set: {
                        status: "expired",
                    },
                }
        )

        await Service.updateMany(
            {
                userId: subscription.userId,
            },
            {
                $set: {
                    isVisible: false,
                },
            }
        );

        logger.info(
            `Subscription expired for user ${subscription.userId}`
        );
    }

});

export default subscriptionCron;
import cron from "node-cron";
import Subscription from "../Models/Subscription.js";
import Service from "../Models/Service.js";
import { logger } from "../Config/Logger.js";

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
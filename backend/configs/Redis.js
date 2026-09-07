import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "./Logger.js";

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

// ==============================
// Redis Events
// ==============================

redisClient.on("connect", () => {
    logger.info("🔗 Connecting to Redis...");
});

redisClient.on("ready", () => {
    logger.info("✅ Redis connected successfully.");
});

redisClient.on("error", (error) => {
    logger.error(`❌ Redis Error: ${error.message}`);
});

redisClient.on("end", () => {
    logger.warn("⚠️ Redis connection closed.");
});

// ==============================
// Connect Function
// ==============================

export const connectRedis = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    } catch (error) {
        logger.error(`Redis Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default redisClient;
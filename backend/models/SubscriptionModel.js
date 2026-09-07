import mongoose from "mongoose";
 
const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "pending"],
      default: "pending",
      index: true, // NEW: node-cron jobs that check for expired
      // subscriptions will filter by status a lot — index it.
    },
    razorpaySubscriptionId: {
      type: String,
      default: null,
      index: true, // NEW: your Razorpay webhook will look up the
      // subscription by this ID on every single webhook event —
      // this must be indexed or it will get slow as your user base grows.
      sparse: true, // needed alongside index since many docs will have null here
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpayOrderId: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    expiryDate: {
      type: Date,
      default: null,
      index: true, // NEW: your node-cron job for expiring subscriptions
      // will query "expiryDate < now" — index this too.
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  { timestamps: true }
);
 
const Subscription = mongoose.model("Subscription", subscriptionSchema);
 
export default Subscription;
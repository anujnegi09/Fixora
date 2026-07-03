import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
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
    },
    razorpaySubscriptionId: {
      type: String, // Razorpay Subscription ID
      default: null,
    },
    razorpayPaymentId: {
      type: String, // Latest payment ID
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
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    amountPaid : {
        type : Number,
        default : 0,
        required : true
    },
    currency :{
        type: String,
        default: "INR",
    }
},{timestamps : true});
 

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
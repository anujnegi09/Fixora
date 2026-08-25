import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createSubscription,
  getMySubscription,
  cancelSubscription,
   verifySubscriptionPayment,
} from "../../features/subscription/subscriptionThunks";

import {
  selectSubscription,
  selectSubscriptionLoading,
  selectCreateSubscriptionLoading,
  selectCancelSubscriptionLoading,
  selectSubscriptionError,
} from "../../features/subscription/subscriptionSelectors";

const Subscription = () => {
  const dispatch = useDispatch();

  // ==========================================
  // Redux
  // ==========================================

  const subscription = useSelector(selectSubscription);
  const loading = useSelector(selectSubscriptionLoading);
  const createLoading = useSelector(selectCreateSubscriptionLoading);
  const cancelLoading = useSelector(selectCancelSubscriptionLoading);
  const error = useSelector(selectSubscriptionError);

  // ==========================================
  // Get My Subscription
  // ==========================================

  useEffect(() => {
    dispatch(getMySubscription());
  }, [dispatch]);


  useEffect(() => {
  const script = document.createElement("script");

  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

  // ==========================================
  // Create Subscription
  // ==========================================
  const handleCreateSubscription = async (plan) => {
  try {
    const result = await dispatch(
      createSubscription(plan)
    ).unwrap();

    const razorpaySubscription =
      result.data.razorpaySubscription;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      subscription_id:
        razorpaySubscription.id,

      name: "Fixora",

      description:
        plan === "monthly"
          ? "Fixora Monthly Subscription"
          : "Fixora Yearly Subscription",

      handler: async function (response) {
        await dispatch(
          verifySubscriptionPayment({
            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_subscription_id:
              response.razorpay_subscription_id,

            razorpay_signature:
              response.razorpay_signature,
          })
        ).unwrap();

        dispatch(getMySubscription());
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.error("Subscription payment failed:", error);
  }
};

  // ==========================================
  // Cancel Subscription
  // ==========================================

  const handleCancelSubscription = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription?",
    );

    if (!confirmed) return;

    dispatch(cancelSubscription());
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-blue-600">
            Loading subscription...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* ==========================================
            Header
        ========================================== */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Subscription</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your Fixora subscription.
          </p>
        </div>

        {/* ==========================================
            Error
        ========================================== */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            Subscription Card
        ========================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* ==========================================
              Card Header
          ========================================== */}

          <div className="border-b border-gray-100 px-6 py-6">
            <h2 className="text-xl font-bold text-gray-800">
              Fixora Subscription
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Unlock service provider features with a subscription.
            </p>
          </div>

          {/* ==========================================
              Current Subscription
          ========================================== */}

          {subscription?.status === "active" ? (
            <div className="p-6">
              {/* Status */}

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Subscription Status</p>

                  <p className="mt-1 text-lg font-bold capitalize text-gray-800">
                    {subscription.status || "Unknown"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    subscription.status === "active"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {subscription.status || "Unknown"}
                </span>
              </div>

              {/* Subscription Information */}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Plan</p>

                  <p className="mt-1 font-semibold capitalize text-gray-800">
                    {subscription.plan || "Subscription"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Start Date</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {subscription.startDate
                      ? new Date(subscription.startDate).toLocaleDateString(
                          "en-IN",
                        )
                      : "-"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Expiry Date</p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {subscription.expiryDate
                      ? new Date(subscription.expiryDate).toLocaleDateString(
                          "en-IN",
                        )
                      : "-"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Subscription ID</p>

                  <p className="mt-1 truncate font-semibold text-gray-800">
                    {subscription._id || "-"}
                  </p>
                </div>
              </div>

              {/* Cancel */}

              {subscription.status === "active" && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <button
                    type="button"
                    onClick={handleCancelSubscription}
                    disabled={cancelLoading}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-100
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ==========================================
               No Subscription
            ========================================== */

            <div className="p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
                💎
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800">
                No Active Subscription
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Subscribe to Fixora to unlock the features required to create
                and manage your services.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

  {/* Monthly Plan */}

  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
    <h3 className="text-lg font-bold text-gray-800">
      Monthly
    </h3>

    <p className="mt-2 text-2xl font-bold text-gray-900">
      ₹299
      <span className="text-sm font-normal text-gray-500">
        /month
      </span>
    </p>

    <button
      type="button"
      onClick={() =>
        handleCreateSubscription("monthly")
      }
      disabled={createLoading}
      className="
        mt-5
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-3
        text-sm
        font-semibold
        text-white
        shadow-sm
        transition
        hover:bg-blue-700
        hover:shadow-md
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {createLoading
        ? "Processing..."
        : "Choose Monthly"}
    </button>
  </div>


  {/* Yearly Plan */}

  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
    <h3 className="text-lg font-bold text-gray-800">
      Yearly
    </h3>

    <p className="mt-2 text-2xl font-bold text-gray-900">
      ₹2999
      <span className="text-sm font-normal text-gray-500">
        /year
      </span>
    </p>

    <button
      type="button"
      onClick={() =>
        handleCreateSubscription("yearly")
      }
      disabled={createLoading}
      className="
        mt-5
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-3
        text-sm
        font-semibold
        text-white
        shadow-sm
        transition
        hover:bg-blue-700
        hover:shadow-md
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {createLoading
        ? "Processing..."
        : "Choose Yearly"}
    </button>
  </div>

</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   createSubscription,
//   getMySubscription,
//   cancelSubscription,
//    verifySubscriptionPayment,
// } from "../../features/subscription/subscriptionThunks";

// import {
//   selectSubscription,
//   selectSubscriptionLoading,
//   selectCreateSubscriptionLoading,
//   selectCancelSubscriptionLoading,
//   selectSubscriptionError,
// } from "../../features/subscription/subscriptionSelectors";

// const Subscription = () => {
//   const dispatch = useDispatch();

//   // ==========================================
//   // Redux
//   // ==========================================

//   const subscription = useSelector(selectSubscription);
//   const loading = useSelector(selectSubscriptionLoading);
//   const createLoading = useSelector(selectCreateSubscriptionLoading);
//   const cancelLoading = useSelector(selectCancelSubscriptionLoading);
//   const error = useSelector(selectSubscriptionError);

//   // ==========================================
//   // Get My Subscription
//   // ==========================================

//   useEffect(() => {
//     dispatch(getMySubscription());
//   }, [dispatch]);

//   useEffect(() => {
//   const script = document.createElement("script");

//   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   script.async = true;

//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//   };
// }, []);

//   // ==========================================
//   // Create Subscription
//   // ==========================================
//   const handleCreateSubscription = async (plan) => {
//   try {
//     const result = await dispatch(
//       createSubscription(plan)
//     ).unwrap();

//     const razorpaySubscription =
//       result.data.razorpaySubscription;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,

//       subscription_id:
//         razorpaySubscription.id,

//       name: "Fixora",

//       description:
//         plan === "monthly"
//           ? "Fixora Monthly Subscription"
//           : "Fixora Yearly Subscription",

//       handler: async function (response) {
//         await dispatch(
//           verifySubscriptionPayment({
//             razorpay_payment_id:
//               response.razorpay_payment_id,

//             razorpay_subscription_id:
//               response.razorpay_subscription_id,

//             razorpay_signature:
//               response.razorpay_signature,
//           })
//         ).unwrap();

//         dispatch(getMySubscription());
//       },

//       theme: {
//         color: "#2563eb",
//       },
//     };

//     const razorpay = new window.Razorpay(options);

//     razorpay.open();
//   } catch (error) {
//     console.error("Subscription payment failed:", error);
//   }
// };

//   // ==========================================
//   // Cancel Subscription
//   // ==========================================

//   const handleCancelSubscription = () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to cancel your subscription?",
//     );

//     if (!confirmed) return;

//     dispatch(cancelSubscription());
//   };

//   // ==========================================
//   // Loading
//   // ==========================================

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-24">
//         <div className="mx-auto max-w-3xl text-center">
//           <p className="text-sm font-medium text-blue-600">
//             Loading subscription...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // Render
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-24 sm:px-6">
//       <div className="mx-auto max-w-3xl">
//         {/* ==========================================
//             Header
//         ========================================== */}

//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-800">Subscription</h1>

//           <p className="mt-2 text-sm text-gray-500">
//             Manage your Fixora subscription.
//           </p>
//         </div>

//         {/* ==========================================
//             Error
//         ========================================== */}

//         {error && (
//           <div className="mb-6 rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {/* ==========================================
//             Subscription Card
//         ========================================== */}

//         <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//           {/* ==========================================
//               Card Header
//           ========================================== */}

//           <div className="border-b border-gray-100 px-6 py-6">
//             <h2 className="text-xl font-bold text-gray-800">
//               Fixora Subscription
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Unlock service provider features with a subscription.
//             </p>
//           </div>

//           {/* ==========================================
//               Current Subscription
//           ========================================== */}

//           {subscription?.status === "active" ? (
//             <div className="p-6">
//               {/* Status */}

//               <div className="mb-6 flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Subscription Status</p>

//                   <p className="mt-1 text-lg font-bold capitalize text-gray-800">
//                     {subscription.status || "Unknown"}
//                   </p>
//                 </div>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
//                     subscription.status === "active"
//                       ? "bg-green-50 text-green-600"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {subscription.status || "Unknown"}
//                 </span>
//               </div>

//               {/* Subscription Information */}

//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-xs text-gray-500">Plan</p>

//                   <p className="mt-1 font-semibold capitalize text-gray-800">
//                     {subscription.plan || "Subscription"}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-xs text-gray-500">Start Date</p>

//                   <p className="mt-1 font-semibold text-gray-800">
//                     {subscription.startDate
//                       ? new Date(subscription.startDate).toLocaleDateString(
//                           "en-IN",
//                         )
//                       : "-"}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-xs text-gray-500">Expiry Date</p>

//                   <p className="mt-1 font-semibold text-gray-800">
//                     {subscription.expiryDate
//                       ? new Date(subscription.expiryDate).toLocaleDateString(
//                           "en-IN",
//                         )
//                       : "-"}
//                   </p>
//                 </div>

//                 <div className="rounded-lg bg-gray-50 p-4">
//                   <p className="text-xs text-gray-500">Subscription ID</p>

//                   <p className="mt-1 truncate font-semibold text-gray-800">
//                     {subscription._id || "-"}
//                   </p>
//                 </div>
//               </div>

//               {/* Cancel */}

//               {subscription.status === "active" && (
//                 <div className="mt-6 border-t border-gray-100 pt-6">
//                   <button
//                     type="button"
//                     onClick={handleCancelSubscription}
//                     disabled={cancelLoading}
//                     className="
//                       w-full
//                       rounded-lg
//                       border
//                       border-red-200
//                       bg-red-50
//                       px-4
//                       py-3
//                       text-sm
//                       font-semibold
//                       text-red-600
//                       transition
//                       hover:bg-red-100
//                       disabled:cursor-not-allowed
//                       disabled:opacity-50
//                     "
//                   >
//                     {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             /* ==========================================
//                No Subscription
//             ========================================== */

//             <div className="p-8 text-center">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
//                 💎
//               </div>

//               <h2 className="mt-4 text-xl font-bold text-gray-800">
//                 No Active Subscription
//               </h2>

//               <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
//                 Subscribe to Fixora to unlock the features required to create
//                 and manage your services.
//               </p>

//               <div className="mt-6 grid gap-4 sm:grid-cols-2">

//   {/* Monthly Plan */}

//   <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
//     <h3 className="text-lg font-bold text-gray-800">
//       Monthly
//     </h3>

//     <p className="mt-2 text-2xl font-bold text-gray-900">
//       ₹299
//       <span className="text-sm font-normal text-gray-500">
//         /month
//       </span>
//     </p>

//     <button
//       type="button"
//       onClick={() =>
//         handleCreateSubscription("monthly")
//       }
//       disabled={createLoading}
//       className="
//         mt-5
//         w-full
//         rounded-lg
//         bg-blue-600
//         px-4
//         py-3
//         text-sm
//         font-semibold
//         text-white
//         shadow-sm
//         transition
//         hover:bg-blue-700
//         hover:shadow-md
//         disabled:cursor-not-allowed
//         disabled:opacity-50
//       "
//     >
//       {createLoading
//         ? "Processing..."
//         : "Choose Monthly"}
//     </button>
//   </div>

//   {/* Yearly Plan */}

//   <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
//     <h3 className="text-lg font-bold text-gray-800">
//       Yearly
//     </h3>

//     <p className="mt-2 text-2xl font-bold text-gray-900">
//       ₹2999
//       <span className="text-sm font-normal text-gray-500">
//         /year
//       </span>
//     </p>

//     <button
//       type="button"
//       onClick={() =>
//         handleCreateSubscription("yearly")
//       }
//       disabled={createLoading}
//       className="
//         mt-5
//         w-full
//         rounded-lg
//         bg-blue-600
//         px-4
//         py-3
//         text-sm
//         font-semibold
//         text-white
//         shadow-sm
//         transition
//         hover:bg-blue-700
//         hover:shadow-md
//         disabled:cursor-not-allowed
//         disabled:opacity-50
//       "
//     >
//       {createLoading
//         ? "Processing..."
//         : "Choose Yearly"}
//     </button>
//   </div>

// </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Subscription;

import { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheck,
  FaCrown,
  FaCalendarAlt,
  FaCreditCard,
  FaTimes,
} from "react-icons/fa";

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
import Button from "../../components/common/Button";

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

  const [selectedPlan, setSelectedPlan] = useState(null);

  // ==========================================
  // Get My Subscription
  // ==========================================

  useEffect(() => {
    dispatch(getMySubscription());
  }, [dispatch]);

  // ==========================================
  // Razorpay Script
  // ==========================================

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
  setSelectedPlan(plan);

  try {
    const result = await dispatch(
      createSubscription(plan)
    ).unwrap();

    const razorpaySubscription =
      result.data.razorpaySubscription;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      subscription_id: razorpaySubscription.id,

      name: "Fixora",

      description:
        plan === "monthly"
          ? "Fixora Monthly Subscription"
          : "Fixora Yearly Subscription",

      handler: async function (response) {
        try {
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
        } finally {
          setSelectedPlan(null);
        }
      },

      theme: {
        color: "#6E42E5",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.error(
      "Subscription payment failed:",
      error
    );

    setSelectedPlan(null);
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
      <div className="min-h-screen bg-[#F8F7FC] px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#6E42E5]/20 border-t-[#6E42E5]" />

          <p className="mt-4 text-sm font-medium text-gray-500">
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
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-12 sm:px-6 lg:px-8 mt-13">
      <div className="mx-auto max-w-5xl">
        {/* ==========================================
            Header
        ========================================== */}

        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6E42E5]/10">
            <FaCrown className="text-[#6E42E5]" size={24} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose your Fixora plan
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Unlock powerful features and start growing your service business
            with Fixora.
          </p>
        </div>

        {/* ==========================================
            Error
        ========================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* ==========================================
            Active Subscription
        ========================================== */}

        {subscription?.status === "active" ? (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Top Section */}

            <div className="border-b border-gray-100 bg-gradient-to-r from-[#6E42E5]/10 to-transparent px-6 py-7 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6E42E5] text-white shadow-sm">
                    <FaCrown size={20} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Your Subscription
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      You currently have an active Fixora subscription.
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-xs font-bold capitalize text-green-600">
                  ● {subscription.status}
                </span>
              </div>
            </div>

            {/* Subscription Details */}

            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Plan */}

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#6E42E5]/10">
                    <FaCrown className="text-[#6E42E5]" size={15} />
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    Current Plan
                  </p>

                  <p className="mt-1 text-lg font-bold capitalize text-gray-900">
                    {subscription.plan || "Subscription"}
                  </p>
                </div>

                {/* Start Date */}

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <FaCalendarAlt className="text-blue-600" size={15} />
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    Start Date
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {subscription.startDate
                      ? new Date(subscription.startDate).toLocaleDateString(
                          "en-IN",
                        )
                      : "-"}
                  </p>
                </div>

                {/* Expiry */}

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                    <FaCalendarAlt className="text-orange-500" size={15} />
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    Expiry Date
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    {subscription.expiryDate
                      ? new Date(subscription.expiryDate).toLocaleDateString(
                          "en-IN",
                        )
                      : "-"}
                  </p>
                </div>

                {/* ID */}

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                    <FaCreditCard className="text-purple-600" size={15} />
                  </div>

                  <p className="text-xs font-medium text-gray-500">
                    Subscription ID
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-gray-900">
                    {subscription._id || "-"}
                  </p>
                </div>
              </div>

              {/* Cancel */}

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    sm:w-auto
                  "
                >
                  <FaTimes size={13} />

                  {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             Pricing Section
          ========================================== */

          <div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* ==========================================
                  Monthly
              ========================================== */}

              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#6E42E5]/40 hover:shadow-xl sm:p-8">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#6E42E5]/5 blur-2xl" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#6E42E5]">
                        FLEXIBLE
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        Monthly
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6E42E5]/10">
                      <FaCalendarAlt className="text-[#6E42E5]" size={18} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      ₹149
                    </span>

                    <span className="mb-1 text-sm text-gray-500">/ month</span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Perfect if you want flexibility and prefer a monthly
                    commitment.
                  </p>

                  <div className="my-4 h-px bg-gray-100" />

                  <ul className="space-y-4 mb-5">
                    {[
                      "Create and manage services",
                      "Receive customer bookings",
                      "Manage your service profile",
                      "Access provider features",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6E42E5]/10">
                          <FaCheck className="text-[#6E42E5]" size={10} />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    onClick={() => handleCreateSubscription("monthly")}
                    disabled={createLoading}
                    loading={createLoading && selectedPlan === "monthly"}
                    loadingText="Processing..."
                    variant="subscription"
                    size="md"
                    fullWidth
                    className="mt-auto"
                  >
                    Choose Monthly
                  </Button>
                </div>
              </div>

              {/* ==========================================
                  Yearly
              ========================================== */}

              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-md transition duration-300 hover:-translate-y-1 hover:border-[#6E42E5]/40 shadow-xl sm:p-8">
                {/* Popular Badge */}

                <div className="absolute right-4 top-4 rounded-full bg-[#6E42E5] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Best Value
                </div>

                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#6E42E5]/10 blur-3xl" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between pr-24">
                    <div>
                      <p className="text-sm font-semibold text-[#6E42E5]">
                        SAVE MORE
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        Yearly
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6E42E5] text-white">
                      <FaCrown size={18} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      ₹1599
                    </span>

                    <span className="mb-1 text-sm text-gray-500">/ year</span>
                  </div>

                  <div className="mt-2 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                    Save ₹189 per year
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Best for providers who want uninterrupted access throughout
                    the year.
                  </p>

                  <div className="my-4 h-px bg-gray-100" />

                  <ul className="space-y-4 mb-5">
                    {[
                      "Create and manage services",
                      "Receive customer bookings",
                      "Manage your service profile",
                      "Access provider features",
                    ].map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6E42E5]/10">
                          <FaCheck className="text-[#6E42E5]" size={10} />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    onClick={() => handleCreateSubscription("yearly")}
                    disabled={createLoading}
                    loading={createLoading && selectedPlan === "yearly"}
                    loadingText="Processing..."
                    variant="subscription"
                    size="md"
                    fullWidth
                    className="mt-auto"
                  >
                    Choose Yearly
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Note */}

            <p className="mt-8 text-center text-xs text-gray-400">
              Secure payments powered by Razorpay. You can cancel your
              subscription anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;

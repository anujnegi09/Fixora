// subscriptionSelectors.js

export const selectSubscription = (state) =>
  state.subscription.subscription;

export const selectSubscriptionLoading = (state) =>
  state.subscription.loading;

export const selectCreateSubscriptionLoading = (state) =>
  state.subscription.createLoading;

export const selectVerifySubscriptionLoading = (state) =>
  state.subscription.verifyLoading;

export const selectCancelSubscriptionLoading = (state) =>
  state.subscription.cancelLoading;

export const selectSubscriptionError = (state) =>
  state.subscription.error;